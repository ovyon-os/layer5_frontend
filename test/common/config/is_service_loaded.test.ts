import { describe, it, expect } from "vitest";
import { isServiceLoaded } from "../../../src/common/config/is_service_loaded";
import type { OvyonOS } from "../../../src/types";

describe("isServiceLoaded", () => {
  it("should return true if the service is loaded", () => {
    const hass = {
      services: {
        light: {
          turn_on: {},
        },
      },
    } as unknown as OvyonOS;
    expect(isServiceLoaded(hass, "light", "turn_on")).toBe(true);
  });

  it("should return false if the service is not loaded", () => {
    const hass: OvyonOS = {
      services: {
        light: {
          turn_on: {},
        },
      },
    } as unknown as OvyonOS;
    expect(isServiceLoaded(hass, "light", "turn_off")).toBe(false);
  });

  it("should return false if the domain is not loaded", () => {
    const hass: OvyonOS = {
      services: {
        light: {
          turn_on: {},
        },
      },
    } as unknown as OvyonOS;
    expect(isServiceLoaded(hass, "switch", "turn_on")).toBe(false);
  });

  it("should handle null hass", () => {
    expect(
      isServiceLoaded(null as unknown as OvyonOS, "light", "turn_on")
    ).toBe(null);
  });
});
