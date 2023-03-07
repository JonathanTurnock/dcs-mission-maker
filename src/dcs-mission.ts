import JSZip from "jszip";
import { js2Lua } from "./js-2-lua";
import { options } from "./files/options";
import { mapResource } from "./files/mapResource";
import { warehouses } from "./files/warehouses";
import { mission } from "./files/mission";
import { dictionary } from "./files/dictionary";
import { Dictionary } from "./dictionary";

export type DcsMissionProps = {
  theatre: string;
};

export class DcsMission {
  public readonly dictionary: Dictionary;

  constructor(public readonly props: DcsMissionProps) {
    this.dictionary = new Dictionary();
  }

  getFiles() {
    return [
      ["options", `options = ${js2Lua(options({}))}`],
      ["l10n/DEFAULT/mapResource", `mapResource = ${js2Lua(mapResource({}))}`],
      ["warehouses", `warehouses = ${js2Lua(warehouses({}))}`],
      ["theatre", this.props.theatre],
      [
        "mission",
        `mission = ${js2Lua(
          mission({
            maxDictId: this.dictionary.maxDictId,
            theatre: this.props.theatre,
            descriptionText: this.dictionary.addEntry("descriptionText", ""),
            descriptionRedTask: this.dictionary.addEntry(
              "descriptionRedTask",
              "",
            ),
            descriptionBlueTask: this.dictionary.addEntry(
              "descriptionBlueTask",
              "",
            ),
            descriptionNeutralsTask: this.dictionary.addEntry(
              "descriptionNeutralsTask",
              "",
            ),
            sortie: this.dictionary.addEntry("sortie", ""),
          }),
        )}`,
      ],
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
