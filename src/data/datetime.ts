import type { OvyonOS } from "../types";

export const setDateTimeValue = (
  hass: OvyonOS,
  entityId: string,
  datetime: Date
) => {
  hass.callService("datetime", "set_value", {
    entity_id: entityId,
    datetime: datetime.toISOString(),
  });
};
