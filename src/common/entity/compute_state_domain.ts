import type { HassEntity } from "ovyon-js-websocket";
import { computeDomain } from "./compute_domain";

export const computeStateDomain = (stateObj: HassEntity) =>
  computeDomain(stateObj.entity_id);
