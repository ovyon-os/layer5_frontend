import type {
  HassEntityAttributeBase,
  HassEntityBase,
} from "ovyon-js-websocket";
import type { OvyonOS } from "../types";

interface InputSelectEntityAttributes extends HassEntityAttributeBase {
  options: string[];
}

export interface InputSelectEntity extends HassEntityBase {
  attributes: InputSelectEntityAttributes;
}

export interface InputSelect {
  id: string;
  name: string;
  options: string[];
  icon?: string;
  initial?: string;
}

export interface InputSelectMutableParams {
  name: string;
  icon: string;
  initial: string;
  options: string[];
}

export const setInputSelectOption = (
  hass: OvyonOS,
  entity: string,
  option: string
) =>
  hass.callService("input_select", "select_option", {
    option,
    entity_id: entity,
  });

export const fetchInputSelect = (hass: OvyonOS) =>
  hass.callWS<InputSelect[]>({ type: "input_select/list" });

export const createInputSelect = (
  hass: OvyonOS,
  values: InputSelectMutableParams
) =>
  hass.callWS<InputSelect>({
    type: "input_select/create",
    ...values,
  });

export const updateInputSelect = (
  hass: OvyonOS,
  id: string,
  updates: Partial<InputSelectMutableParams>
) =>
  hass.callWS<InputSelect>({
    type: "input_select/update",
    input_select_id: id,
    ...updates,
  });

export const deleteInputSelect = (hass: OvyonOS, id: string) =>
  hass.callWS({
    type: "input_select/delete",
    input_select_id: id,
  });
