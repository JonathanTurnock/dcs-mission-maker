# DCS World Mission File Creator

This project provides a JavaScript class that can be used to manage the creation of DCS World mission files.

The primary use case is validation, this project holds lots of zod schemas for the mission file ensuring generated mission files conform to the DCS models.

## Installation

To install this package, you can use npm:

```shell
npm install dcs-mission-creator
```

## Usage

To use this class, you can include it in your project and create a new instance of the `DcsMission` class:

```javascript
const fs = require("fs");
const { DcsMission } = require("dcs-mission-creator");

const dcsMission = new DcsMission({ theatre: "Caucasus" });

dcsMission
  .build()
  .then((file) => fs.writeFileSync("example.miz", Buffer.from(file)));
```

In this example, we create a new instance of the DcsMission class with the theatre option set to "Caucasus". We then call the build method to generate the mission file content and write it to a file called "example.miz".

You can customize the mission by passing additional options to the DcsMission constructor, such as name, description, weather, time, map, airports, units, and more.

For more information on the available options and methods, please see the documentation provided with the class.

## Contributing
If you'd like to contribute to this project, please feel free to fork the repository and submit a pull request.

### Expanding Schemas

To make a new Zod Schema first create the construct in the ME, (Place units, add waypoints etc)

Unzip the Mission File and copy the code block to DCS Fiddle.

> https://dcsfiddle.pages.dev/

Immediately return the code inline and then use the following website to convert the JSON to a zod schema.

> https://transform.tools/json-to-zod

## License

This project is licensed under the MIT License. See the LICENSE file for more information.