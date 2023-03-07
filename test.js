const fs = require("fs");
const { DcsMission } = require("./dist/dcs-mission");

const dcsMission = new DcsMission({ theatre: "Caucasus" });

dcsMission
  .build()
  .then((file) => fs.writeFileSync("example.miz", Buffer.from(file)));
