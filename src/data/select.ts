import type {
  HassEntityAttributeBase,
  HassEntityBase,
} from "ovyon-js-websocket";
import type { OvyonOS } from "../types";

interface SelectEntityAttributes extends HassEntityAttributeBase {
  options: string[];
}

export interface SelectEntity extends HassEntityBase {
  attributes: SelectEntityAttributes;
}

export const setSelectOption = (
  hass: OvyonOS,
  entity: string,
  option: string
) =>
  hass.callService(
    "select",
    "select_option",
    { option },
    { entity_id: entity }
  );
