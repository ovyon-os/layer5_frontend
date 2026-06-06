import type { HassEventBase } from "ovyon-js-websocket";
import type { OvyonOS } from "../types";

export const EVENT_TAG_SCANNED = "tag_scanned";

export interface TagScannedEvent extends HassEventBase {
  event_type: "tag_scanned";
  data: {
    tag_id: string;
    device_id?: string;
  };
}

export interface Tag {
  id: string;
  name?: string;
  description?: string;
  last_scanned?: string;
}

export interface UpdateTagParams {
  name?: Tag["name"];
  description?: Tag["description"];
}

export const fetchTags = async (hass: OvyonOS) =>
  hass.callWS<Tag[]>({
    type: "tag/list",
  });

export const createTag = async (
  hass: OvyonOS,
  params: UpdateTagParams,
  tagId?: string
) =>
  hass.callWS<Tag>({
    type: "tag/create",
    tag_id: tagId,
    ...params,
  });

export const updateTag = async (
  hass: OvyonOS,
  tagId: string,
  params: UpdateTagParams
) =>
  hass.callWS<Tag>({
    ...params,
    type: "tag/update",
    tag_id: tagId,
  });

export const deleteTag = async (hass: OvyonOS, tagId: string) =>
  hass.callWS<undefined>({
    type: "tag/delete",
    tag_id: tagId,
  });
