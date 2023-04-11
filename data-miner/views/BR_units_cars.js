const pipeline = [
  {
    '$project': {
      'type': 1,
      'DisplayName': 1,
      'category': 1,
      'paintSchemes': 1
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
      'displayName': 1,
      'category': 1,
      'paintSchemes': 1,
      'countries': '$Countries.Name',
      'countriesWorldID': '$Countries.WorldID'
    }
  }
]

module.exports = {
  pipeline,
  collection: "Cars",
  name: "BR_units_cars",
};