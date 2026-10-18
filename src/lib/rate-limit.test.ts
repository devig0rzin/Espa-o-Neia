import { describe, expect, it } from "vitest";
import { allow } from "./rate-limit";

describe("allow", () => {
  it("bloqueia depois do limite e libera após a janela", () => {
    const k = "ip-teste";
    for (let i = 0; i < 3; i++) expect(allow(k, 3, 1000, 1000 + i)).toBe(true);
    expect(allow(k, 3, 1000, 1010)).toBe(false);
    expect(allow(k, 3, 1000, 5000)).toBe(true);
  });
});
