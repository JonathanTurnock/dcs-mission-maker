const pipeline = [
  {
    '$project': {
      'type': 1,
      'DisplayName': 1,
      'category': 1
    }
  }, {
    '$lookup': {
      'from': 'BR_units_by_country',
      'localField': 'type',
      'foreignField': 'Units.Name',
      'as': 'Countries'
    }
  }, {
    '$project': {
      'type': 1,
      'DisplayName': 1,
      'category': 1,
      'Countries': '$Countries.Name',
      'CountriesWorldID': '$Countries.WorldID'
    }
  }
]

module.exports = {
  pipeline,
  collection: "Planes",
  name: "BR_units_planes",
};