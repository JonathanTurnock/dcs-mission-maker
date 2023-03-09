var axios = require("axios");
var data = JSON.stringify({
  collection: "Planes",
  database: "me_db",
  dataSource: "Cluster0",
  projection: {
    _id: 1,
    type: 1,
  },
});

var config = {
  method: "post",
  url: "https://eu-west-2.aws.data.mongodb-api.com/app/data-bwmxa/endpoint/data/v1/action/findOne",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Request-Headers": "*",
    "api-key":
      "pTlw6x73sbAg3TSrZWy4Xi4uLj378v0uBqcR2WBBio00c8LJNnjflwOIjxN0kxle",
  },
  data: data,
};

axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });
