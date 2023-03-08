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

## Data

The Library also exposes type hinted data from DCS in the form of direct json objects.

This information is exported via scripts present in the `data/...` folder and compiled into typescript for type information.

Add new scripts and JSON files then expose them in the `.datarc.yml` file

> To get terrain data please use the `global-terrain-database`:
> 
> https://github.com/JonathanTurnock/dcs-global-terrain-database
> 
> It's an external library as it's not always required

### Planes

Includes the Plane and some high level information

```ts
import { ME_DB } from "dcs-mission-maker"

ME_DB.planes["F-16C bl.50"] 
// {
//     type: "F-16C bl.50",
//     country_of_origin: "USA",
//     id: "F-16C bl.50",
//     tasks: [
//     "CAP",
//     "Escort",
//     "Fighter Sweep",
//     "Intercept",
//     "Pinpoint Strike",
//     "CAS",
//     "Ground Attack",
//     "Runway Attack",
//     "AFAC",
//     "Reconnaissance",
//     "Anti-ship Strike",
// ],
//     attribute: [
//     1,
//     1,
//     1,
//     7,
//     "Multirole fighters",
//     "Refuelable",
//     "Datalink",
//     "Link16",
//     "All",
//     "NonAndLightArmoredUnits",
//     "NonArmoredUnits",
//     "Air",
//     "Planes",
//     "Battle airplanes",
// ],
//     displayName: "F-16C bl.50",
// }
```

### Helos

Includes the Helo and some high level information

```ts
import { ME_DB } from "dcs-mission-maker"

ME_DB.helos["Mi-24V"]
// {
//     type: "Mi-24V",
//     country_of_origin: "RUS",
//     id: "Mi-24V",
//     tasks: [
//     "CAS",
//     "Ground Attack",
//     "Escort",
//     "Transport",
//     "AFAC",
//     "Anti-ship Strike",
// ],
//     attribute: [
//     1,
//     2,
//     6,
//     152,
//     "Attack helicopters",
//     "All",
//     "NonAndLightArmoredUnits",
//     "NonArmoredUnits",
//     "Air",
//     "Helicopters",
// ],
//     displayName: "Mi-24V",
// }
```

### Callnames

Includes the type it applies to and the id

```ts
import { ME_DB } from "dcs-mission-maker"

ME_DB.callnames.Venom
// {
//     id: 9,
//     types: ["F-16C bl.50", "F-16C_50", "F-16C bl.52d"],
//     callname: "Viper",
// }
```

## Contributing

If you'd like to contribute to this project, please feel free to fork the repository and submit a pull request.

### Expanding Schemas

To make a new Zod Schema first create the construct in the ME, (Place units, add waypoints etc)

Unzip the Mission File and copy the lua table to DCS Fiddle.

> https://dcsfiddle.pages.dev/

Immediately return the table inline which will convert it to JSON for you, 
then use the following website to convert the JSON to a zod schema.

> https://transform.tools/json-to-zod

## License

This project is licensed under the MIT License. See the LICENSE file for more information.