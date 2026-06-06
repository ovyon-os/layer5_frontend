import type { OvyonOS } from "../types";

export interface Counter {
  id: string;
  name: string;
  icon?: string;
  initial?: number;
  restore?: boolean;
  minimum?: number;
  maximum?: number;
  step?: number;
}

export interface CounterMutableParams {
  name: string;
  icon: string;
  initial: number;
  restore: boolean;
  minimum: number;
  maximum: number;
  step: number;
}

export const fetchCounter = (hass: OvyonOS) =>
  hass.callWS<Counter[]>({ type: "counter/list" });

export const createCounter = (
  hass: OvyonOS,
  values: CounterMutableParams
) =>
  hass.callWS<Counter>({
    type: "counter/create",
    ...values,
  });

export const updateCounter = (
  hass: OvyonOS,
  id: string,
  updates: Partial<CounterMutableParams>
) =>
  hass.callWS<Counter>({
    type: "counter/update",
    counter_id: id,
    ...updates,
  });

export const deleteCounter = (hass: OvyonOS, id: string) =>
  hass.callWS({
    type: "counter/delete",
    counter_id: id,
  });
