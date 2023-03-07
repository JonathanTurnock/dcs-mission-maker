import { js2Lua } from "./js-2-lua";

describe("js2Lua", () => {
  it("should convert objects to key with square brackets", () => {
    expect(js2Lua({ x: -291014, y: 617414 })).toMatchSnapshot();
    expect(js2Lua({ id: 21, name: "Australia" })).toMatchSnapshot();
  });

  it("should convert array to indexed keys with square brackets", () => {
    expect(
      js2Lua([
        { id: 21, name: "Australia" },
        { id: 15, name: "Israel" },
      ]),
    ).toMatchSnapshot();
  });
});
