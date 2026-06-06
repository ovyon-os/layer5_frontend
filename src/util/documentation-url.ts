import type { OvyonOSConfig } from "../types";

export const documentationUrl = (hass: OvyonOSConfig, path: string) =>
  `https://${
    hass.config.version.includes("b")
      ? "rc"
      : hass.config.version.includes("dev")
        ? "next"
        : "www"
  }.ovyon.io${path}`;
