import type { OvyonOS } from "../types";

export interface CommonControlsResult {
  entities: string[];
}

export const getCommonControlsUsagePrediction = (hass: OvyonOS) =>
  hass.callWS<CommonControlsResult>({
    type: "usage_prediction/common_control",
  });
