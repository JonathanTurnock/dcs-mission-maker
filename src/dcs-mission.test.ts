import { DcsMission } from "./dcs-mission";

describe("given a simple empty mission", () => {
  it("should build a mission file", () => {
    const dcsMission = new DcsMission({ theatre: "Caucasus" });
    expect(dcsMission.getFiles()).toMatchSnapshot();
  });
});
