const pipeline = [
  {
    '$project': {
      'type': 1,
      'DisplayName': 1,
      'Categories': 1
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
      'Categories': 1,
      'Countries': '$Countries.Name',
      'CountriesWorldID': '$Countries.WorldID'
    }
  }
]

module.exports = {
  pipeline,
  collection: "Ships",
  name: "BR_units_ships",
};