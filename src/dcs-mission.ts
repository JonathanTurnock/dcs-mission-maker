import JSZip from "jszip";
import { js2Lua } from "./js-2-lua";
import { options } from "./files/options";
import { mapResource } from "./files/mapResource";
import { warehouses } from "./files/warehouses";
import { mission, MissionProps, planeGroup } from "./files/mission";
import { dictionary } from "./files/dictionary";
import { Dictionary } from "./dictionary";

export class DcsMission {
  public readonly dictionary: Dictionary;

  constructor(public readonly props: Omit<MissionProps, "maxDictId">) {
    this.dictionary = new Dictionary();
  }

  getFiles(): Array<[string, string]> {
    const descriptionText = this.dictionary.addEntry(
      "descriptionText",
      this.props.descriptionText,
    );

    const descriptionBlueTask = this.dictionary.addEntry(
      "descriptionBlueTask",
      this.props.descriptionBlueTask,
    );

    const descriptionRedTask = this.dictionary.addEntry(
      "descriptionRedTask",
      this.props.descriptionRedTask,
    );

    const descriptionNeutralsTask = this.dictionary.addEntry(
      "descriptionNeutralsTask",
      this.props.descriptionNeutralsTask,
    );

    const sortie = this.dictionary.addEntry("sortie", this.props.sortie);

    const _mission = mission({
      ...this.props,
      descriptionText,
      descriptionBlueTask,
      descriptionRedTask,
      descriptionNeutralsTask,
      sortie,
      maxDictId: this.dictionary.maxDictId,
    });

    return [
      ["options", `options = ${js2Lua(options({}))}`],
      ["l10n/DEFAULT/mapResource", `mapResource = ${js2Lua(mapResource({}))}`],
      ["warehouses", `warehouses = ${js2Lua(warehouses({}))}`],
      ["theatre", _mission.theatre],
      ["mission", `mission = ${js2Lua(_mission)}`],
      [
        "l10n/DEFAULT/dictionary",
        `dictionary = ${js2Lua(dictionary(this.dictionary.entries))}`,
      ],
    ];
  }

  build() {
    const zip = new JSZip();
    this.getFiles().forEach(([path, data]) => zip.file(path, data));
    return zip.generateAsync({ compression: "DEFLATE", type: "arraybuffer" });
  }
}
