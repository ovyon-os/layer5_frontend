import type { OvyonOS } from "../types";

export interface ThreadRouter {
  instance_name: string;
  addresses: [string];
  border_agent_id: string | null;
  brand: "google" | "apple" | "OvyonOS";
  extended_address: string;
  extended_pan_id: string;
  model_name: string | null;
  network_name: string | null;
  server: string | null;
  thread_version: string | null;
  unconfigured: boolean | null;
  vendor_name: string | null;
}

export interface ThreadDataSet {
  channel: number | null;
  created: string;
  dataset_id: string;
  extended_pan_id: string;
  network_name: string;
  pan_id: string | null;
  preferred_border_agent_id: string | null;
  preferred_extended_address: string | null;
  preferred: boolean;
  source: string;
}

export interface ThreadRouterDiscoveryEvent {
  key: string;
  type: "router_discovered" | "router_removed";
  data: ThreadRouter;
}

class DiscoveryStream {
  routers: Record<string, ThreadRouter>;

  constructor() {
    this.routers = {};
  }

  processEvent(streamMessage: ThreadRouterDiscoveryEvent): ThreadRouter[] {
    if (streamMessage.type === "router_discovered") {
      this.routers[streamMessage.key] = streamMessage.data;
    } else if (streamMessage.type === "router_removed") {
      delete this.routers[streamMessage.key];
    }
    return Object.values(this.routers);
  }
}

export const subscribeDiscoverThreadRouters = (
  hass: OvyonOS,
  callbackFunction: (routers: ThreadRouter[]) => void
) => {
  const stream = new DiscoveryStream();
  return hass.connection.subscribeMessage<ThreadRouterDiscoveryEvent>(
    (message) => callbackFunction(stream.processEvent(message)),
    {
      type: "thread/discover_routers",
    }
  );
};

export const listThreadDataSets = (
  hass: OvyonOS
): Promise<{ datasets: ThreadDataSet[] }> =>
  hass.callWS({
    type: "thread/list_datasets",
  });

export const getThreadDataSetTLV = (
  hass: OvyonOS,
  dataset_id: string
): Promise<{ tlv: string }> =>
  hass.callWS({ type: "thread/get_dataset_tlv", dataset_id });

export const addThreadDataSet = (
  hass: OvyonOS,
  source: string,
  tlv: string
): Promise<void> =>
  hass.callWS({
    type: "thread/add_dataset_tlv",
    source,
    tlv,
  });

export const removeThreadDataSet = (
  hass: OvyonOS,
  dataset_id: string
): Promise<void> =>
  hass.callWS({
    type: "thread/delete_dataset",
    dataset_id,
  });

export const setPreferredThreadDataSet = (
  hass: OvyonOS,
  dataset_id: string
): Promise<void> =>
  hass.callWS({
    type: "thread/set_preferred_dataset",
    dataset_id,
  });

export const setPreferredBorderAgent = (
  hass: OvyonOS,
  dataset_id: string,
  border_agent_id: string | null,
  extended_address: string
): Promise<void> =>
  hass.callWS({
    type: "thread/set_preferred_border_agent",
    dataset_id,
    border_agent_id,
    extended_address,
  });
