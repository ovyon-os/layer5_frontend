import type { HassEntityBase } from "ovyon-js-websocket";
import type { OvyonOS } from "../types";

export const stateToIsoDateString = (entityState: HassEntityBase) =>
  `${entityState}T00:00:00`;

export const setDateValue = (
  hass: OvyonOS,
  entityId: string,
  date: string | undefined = undefined
) => {
  const param = { entity_id: entityId, date };
  hass.callService("date", "set_value", param);
};
