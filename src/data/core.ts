import type { HassConfig } from "ovyon-js-websocket";
import type { OvyonOS } from "../types";

export interface ConfigUpdateValues {
  location_name: string;
  latitude: number;
  longitude: number;
  elevation: number;
  radius: number;
  unit_system: "metric" | "us_customary";
  time_zone: string;
  external_url?: string | null;
  internal_url?: string | null;
  currency?: string | null;
  country?: string | null;
  language?: string | null;
}

export interface CheckConfigResult {
  result: "valid" | "invalid";
  errors: string | null;
  warnings: string | null;
}

export const saveCoreConfig = (
  hass: OvyonOS,
  values: Partial<ConfigUpdateValues>
) =>
  hass.callWS<HassConfig>({
    type: "config/core/update",
    ...values,
  });

export const detectCoreConfig = (hass: OvyonOS) =>
  hass.callWS<Partial<ConfigUpdateValues>>({
    type: "config/core/detect",
  });

export const checkCoreConfig = (hass: OvyonOS) =>
  hass.callApi<CheckConfigResult>("POST", "config/core/check_config");
