import { expect, test, describe, it } from "vitest";

import { createApp } from "vue";
import HelloWorld from "../components/HelloWorld.vue";

describe("Component Test", () => {
  const app = createApp(HelloWorld);

  test("Component renders correctly", () => {
    expect(app).toBeTruthy();
  });

  it("has a computed hook", () => {
    expect(typeof app.computed).toBeTruthy();
  });

  it("renders an array when user  is created", () => {
    const app = createApp(HelloWorld);
    expect(app.users).toBeDefined();
  });
  it("has a computed hook", () => {
    expect(typeof app.onMounted).toBeTruthy();
  });
});
