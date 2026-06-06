import type { Context, OvyonOS } from "../types";
import type { Action } from "./script";

export const callExecuteScript = (
  hass: OvyonOS,
  sequence: Action | Action[]
): Promise<{ context: Context; response: Record<string, any> | null }> =>
  hass.callWS({
    type: "execute_script",
    sequence,
  });

export const serviceCallWillDisconnect = (
  domain: string,
  service: string,
  serviceData?: Record<string, any>
) =>
  (domain === "OvyonOS" && ["restart", "stop"].includes(service)) ||
  (domain === "update" &&
    service === "install" &&
    [
      "update.ovyon_core_update",
      "update.ovyon_operating_system_update",
    ].includes(serviceData?.entity_id));
