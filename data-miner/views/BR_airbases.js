const pipeline = [
  {
    $lookup: {
      from: "Airodromes",
      localField: "ID",
      foreignField: "airbase_id",
      as: "raw",
    },
  },
  {
    $unwind: {
      path: "$raw",
      preserveNullAndEmptyArrays: true,
    },
  },
  {
    $lookup: {
      from: "Radios",
      localField: "raw.radio",
      foreignField: "radioId",
      as: "radio",
    },
  },
  {
    $lookup: {
      from: "Beacons",
      localField: "raw.beacons.beaconId",
      foreignField: "beaconId",
      as: "becons",
    },
  },
  {
    $addFields: {
      airdromeData: {
        runways: {
          $map: {
            input: {
              $objectToArray: "$raw.runways",
            },
            as: "run",
            in: {
              name: "$$run.v.name",
            },
          },
        },
        ATC: "$radio.frequency",
        TACAN: {
          $map: {
            input: {
              $filter: {
                input: "$becons",
                as: "be",
                cond: {
                  $eq: ["$$be.type_name", "TACAN"],
                },
              },
            },
            as: "be",
            in: "$$be.channel",
          },
        },
        ILS: {
          $map: {
            input: {
              $filter: {
                input: "$becons",
                as: "be",
                cond: {
                  $eq: ["$$be.type_name", "ILS_GLIDESLOPE"],
                },
              },
            },
            as: "be",
            in: "$$be.frequency",
          },
        },
      },
    },
  },
  {
    $unwind: {
      path: "$airdromeData.ATC",
      preserveNullAndEmptyArrays: true,
    },
  },
  {
    $addFields: {
      airdromeData: {
        ATC: {
          $map: {
            input: "$airdromeData.ATC",
            as: "atc",
            in: {
              $arrayElemAt: ["$$atc", 1],
            },
          },
        },
      },
    },
  },
  {
    $unset: [
      "raw",
      "radio",
      "becons",
      "attributes",
      "category_name",
      "life",
      "category",
      "WorldID",
      "callsign",
      "_origin",
    ],
  },
];

module.exports = {
  pipeline,
  collection: "Airbases",
  name: "BR_airbases",
};
