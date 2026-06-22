export const manifest = {
  screens: {
    scr_adduf6: { name: "Mood Selection", route: "/", state: { "step": 1 }, position: { "x": 160, "y": 220 } },
    scr_1ql4kd: { name: "Filters", route: "/", state: { "step": 2 }, position: { "x": 1560, "y": 220 } },
    scr_43iexh: { name: "Result", route: "/", state: { "step": 3 }, position: { "x": 2960, "y": 220 } }
  },
  sections: {
    sec_1xlnd2: { name: "Mood Discovery Flow", x: 0, y: 0, width: 4320, height: 1180 }
  },
  layers: [
  { kind: "section", id: "sec_1xlnd2", children: [
    { kind: "screen", id: "scr_adduf6" },
    { kind: "screen", id: "scr_1ql4kd" },
    { kind: "screen", id: "scr_43iexh" }]
  }]

};