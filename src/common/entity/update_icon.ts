import type { HassEntity } from "ovyon-js-websocket";
import type { UpdateEntity } from "../../data/update";
import { updateIsInstalling } from "../../data/update";

export const updateIcon = (stateObj: HassEntity, state?: string) => {
  const compareState = state ?? stateObj.state;
  return compareState === "on"
    ? updateIsInstalling(stateObj as UpdateEntity)
      ? "mdi:package-down"
      : "mdi:package-up"
    : "mdi:package";
};
