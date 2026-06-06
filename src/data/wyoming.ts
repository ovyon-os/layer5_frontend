import type { OvyonOS } from "../types";

export interface WyomingInfo {
  asr: WyomingAsrInfo[];
  handle: [];
  intent: [];
  tts: WyomingTtsInfo[];
  wake: [];
}

interface WyomingBaseInfo {
  name: string;
  version: string;
  attribution: Record<string, string>;
}

interface WyomingTtsInfo extends WyomingBaseInfo {}

interface WyomingAsrInfo extends WyomingBaseInfo {}

export const fetchWyomingInfo = (hass: OvyonOS) =>
  hass.callWS<{ info: Record<string, WyomingInfo> }>({ type: "wyoming/info" });
