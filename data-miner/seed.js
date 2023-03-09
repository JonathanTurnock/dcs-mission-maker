const Aigle = require("aigle");
const { MongoClient } = require("mongodb");
const { get } = require("lodash");
const hash = require("object-hash");
const glob = require("glob");
const { basename, extname } = require("path");
const axios = require("axios");
const { readFileSync } = require("fs-extra");
const { DB_NAME, MONGO_URL, ENVS, FILES } = require("./config");

const debug = require("debug")("me_db:seed");

const mongo = new MongoClient(MONGO_URL);
const meDb = mongo.db(DB_NAME);

const sign = (obj, dcsVersion) => {
  obj["_id"] = hash(obj);
  obj["@created"] = new Date().toISOString();
  obj["@dcsversion"] = dcsVersion;
  return obj;
};

const populateCollection =
  (dcsVersion) =>
  async ({ name, data }) => {
    const collection = await meDb.collection(name);

    await Aigle.eachSeries(data, async (value, _) => {
      const signed = sign(value, dcsVersion);
      try {
        await collection.insertOne(signed); // TODO: Use Bulk Insert
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
      const [_, target, env] = exportScript.match(/^.*?(GUI|MISSION):(\w*)\n/);
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
      return { name, data };
    }
  );

  console.log("Populating Mission Editor DB");
  await Aigle.eachSeries(collections, populateCollection(dcsVersion));

  console.log("Populated Mission Editor DB");

  await mongo.close();
}

run();
