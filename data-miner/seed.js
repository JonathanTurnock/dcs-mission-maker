const Aigle = require("aigle");
const { MongoClient } = require("mongodb");
const hash = require("object-hash");
const glob = require("glob");
const { basename, extname } = require("path");
const axios = require("axios");
const { readFileSync } = require("fs-extra");
const { DB_NAME, MONGO_URL, ENVS, FILES, VIEWS } = require("./config");
const { isEqual } = require("lodash")
const debug = require("debug")("me_db:seed");

const mongo = new MongoClient(MONGO_URL);
const meDb = mongo.db(DB_NAME);


const knownArrayPaths = [
  /^Airbases\/\d+\/runways$/g,
  /^Airbases\/\d+\/parking$/g,
  /^Airodromes\/\d+\/projectors$/g,
  /^Airodromes\/\d+\/beacons$/g,
  /^Airodromes\/\d+\/runways$/g,
  /^Airodromes\/\d+\/runwayName$/g,
  /^Radios\/\d+\/frequency$/g,
]



function correctDataTypes(object, path = "") {
  if (!object) return
  Object.keys(object).forEach(function (k) {
    const value = object[k]
    if (typeof value !== "object" || value === undefined || value === null) return
  
    const newpath = `${path}/${k}`
    const isArray = Array.isArray(value)
    const ObjectKeys = Object.keys(value)
    const isArrayExpected = knownArrayPaths.some(x => newpath.match(x))
  
    if (ObjectKeys.length == 0 && !isArray) {
      if (isArrayExpected) {
        object[k] = [];
        return
      }
      console.warn(`Found empty object (should it be an array?): ${newpath}`)
      return
    } else {
      if (!isArray) {
        if (isEqual(ObjectKeys, ['0'])) {
          if (isArrayExpected) {
            object[k] = [value["0"]];
          } else {
            console.warn("Object with only 0 key maybe a array in disguise:", newpath, ObjectKeys, value)
          }
        } else if (isArrayExpected) {
          console.log(`Force converted ${newpath} object to an array`)
          object[k] = Object.values(value)
        }
      }


      correctDataTypes(value, newpath);
      return
    }
  });
}



const sign = (obj, dcsVersion) => {
  obj["_id"] = hash(obj);
  obj["@created"] = new Date().toISOString();
  obj["@dcsversion"] = dcsVersion;
  return obj;
};

const populateCollection =
  (dcsVersion) =>
    async ({ name, data }) => {
      console.log(`Adding ${name} to DB`)
      const collection = await meDb.collection(name);

      await Aigle.eachSeries(data, async (value, _) => {
        try {
          const signed = sign(value, dcsVersion);
          // use upsert to avoid duplication when running more than once (Eg more than one theater)
          await collection.updateOne({ _id: signed._id, '@dcsversion': signed['@dcsversion'] }, { $set: signed }, { upsert: true }); // TODO: Use Bulk Insert
        } catch (e) {
          debug(e.message);
        }
      });
    };

async function run() {
  console.log("Validating Mongo Connection");
  await mongo.connect();
  console.log("Mongo Connection OK");

  console.log("Validating DCS Connection");
  const dcsVersion = await axios
    .get(`http://127.0.0.1:12081/${btoa("return _APP_VERSION")}?env=default`)
    .then((it) => it.data.result);
  console.log("DCS Connection OK");

  console.log("Extracting information from DCS");
  const collections = await Aigle.mapSeries(
    await glob(FILES),
    async (_path) => {
      console.log(`Processing ${_path}`);
      const exportScript = readFileSync(_path, "utf-8");
      const [_, target, env] = exportScript.match(/^.*?(GUI|MISSION):(\w*)/);
      const name = basename(_path).replace(extname(_path), "");
      const baseURL = ENVS[target];

      const data = await axios
        .get(`/${btoa(exportScript)}`, { baseURL, params: { env } })
        .then((it) => it.data.result)
        .catch((e) => {
          if (e.code === "ECONNREFUSED") {
            console.info(
              `Failed to connect to the target environment ${target}:${env} while processing ${_path}, please investigate further using DCS Fiddle`
            );
          } else {
            console.error(e.message);
          }
        });
      correctDataTypes(data, name)
      return { name, data };
    }
  );

  console.log("Populating Mission Editor DB");
  await Aigle.eachSeries(collections, populateCollection(dcsVersion));

  console.log("Populated Mission Editor DB");

  console.log("Creating Views")
  await Aigle.eachSeries(await glob(VIEWS), async (_path) => {
    try {
      const { pipeline, collection, name } = require("./" + _path.replace("\\", "/"))
      console.log(`Adding View ${name}`)
      await meDb.command({ create: name, viewOn: collection, pipeline });
    } catch (e) {
      if (e.message.includes("Namespace already exists")) return
      console.error(e.message);
    }
  });
  console.log("Created Views")

  await mongo.close();
}

run();
