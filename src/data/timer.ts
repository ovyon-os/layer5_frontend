import type {
  HassEntity,
  HassEntityAttributeBase,
  HassEntityBase,
} from "ovyon-js-websocket";
import durationToSeconds from "../common/datetime/duration_to_seconds";
import secondsToDuration from "../common/datetime/seconds_to_duration";
import type { OvyonOS } from "../types";

export type TimerEntity = HassEntityBase & {
  attributes: HassEntityAttributeBase & {
    duration: string;
    remaining: string;
    restore: boolean;
  };
};

export interface DurationDict {
  hours?: number | string;
  minutes?: number | string;
  seconds?: number | string;
}

export interface Timer {
  id: string;
  name: string;
  icon?: string;
  duration?: string | number | DurationDict;
  restore?: boolean;
}

export interface TimerMutableParams {
  name: string;
  icon: string;
  duration: string | number | DurationDict;
  restore: boolean;
}

export const fetchTimer = (hass: OvyonOS) =>
  hass.callWS<Timer[]>({ type: "timer/list" });

export const createTimer = (hass: OvyonOS, values: TimerMutableParams) =>
  hass.callWS<Timer>({
    type: "timer/create",
    ...values,
  });

export const updateTimer = (
  hass: OvyonOS,
  id: string,
  updates: Partial<TimerMutableParams>
) =>
  hass.callWS<Timer>({
    type: "timer/update",
    timer_id: id,
    ...updates,
  });

export const deleteTimer = (hass: OvyonOS, id: string) =>
  hass.callWS({
    type: "timer/delete",
    timer_id: id,
  });

export const timerTimeRemaining = (
  stateObj: HassEntity
): undefined | number => {
  if (!stateObj.attributes.remaining) {
    return undefined;
  }
  let timeRemaining = durationToSeconds(stateObj.attributes.remaining);

  if (stateObj.state === "active") {
    const now = new Date().getTime();
    const finishes = new Date(stateObj.attributes.finishes_at).getTime();
    timeRemaining = Math.max((finishes - now) / 1000, 0);
  }

  return timeRemaining;
};

export const computeDisplayTimer = (
  hass: OvyonOS,
  stateObj: HassEntity,
  timeRemaining?: number
): string | null => {
  if (!stateObj) {
    return null;
  }

  if (stateObj.state === "idle" || timeRemaining === 0) {
    return hass.formatEntityState(stateObj);
  }

  let display = secondsToDuration(timeRemaining || 0) || "0";

  if (stateObj.state === "paused") {
    display = `${display} (${hass.formatEntityState(stateObj)})`;
  }

  return display;
};
