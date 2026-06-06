import type { Connection } from "ovyon-js-websocket";
import { createCollection } from "ovyon-js-websocket";
import type { Store } from "ovyon-js-websocket/dist/store";
import { debounce } from "../common/util/debounce";
import type { OvyonOS } from "../types";
import type { DataEntryFlowStep } from "./data_entry_flow";

export interface RepairsIssue {
  domain: string;
  issue_domain?: string;
  issue_id: string;
  active: boolean;
  is_fixable: boolean;
  severity: "error" | "warning" | "critical";
  breaks_in_ha_version?: string;
  ignored: boolean;
  created: string;
  dismissed_version?: string;
  learn_more_url?: string;
  translation_key?: string;
  translation_placeholders?: Record<string, string>;
}

export const severitySort = {
  critical: 1,
  error: 2,
  warning: 3,
};

export const fetchRepairsIssues = (conn: Connection) =>
  conn.sendMessagePromise<{ issues: RepairsIssue[] }>({
    type: "repairs/list_issues",
  });

export const fetchRepairsIssueData = (
  conn: Connection,
  domain: string,
  issue_id: string
) =>
  conn.sendMessagePromise<{ issue_data: { string: any } }>({
    type: "repairs/get_issue_data",
    domain,
    issue_id,
  });

export const ignoreRepairsIssue = async (
  hass: OvyonOS,
  issue: RepairsIssue,
  ignore: boolean
) =>
  hass.callWS<string>({
    type: "repairs/ignore_issue",
    issue_id: issue.issue_id,
    domain: issue.domain,
    ignore,
  });

export const createRepairsFlow = (
  hass: OvyonOS,
  handler: string,
  issue_id: string
) =>
  hass.callApi<DataEntryFlowStep>("POST", "repairs/issues/fix", {
    handler,
    issue_id,
  });

export const fetchRepairsFlow = (hass: OvyonOS, flowId: string) =>
  hass.callApi<DataEntryFlowStep>("GET", `repairs/issues/fix/${flowId}`);

export const handleRepairsFlowStep = (
  hass: OvyonOS,
  flowId: string,
  data: Record<string, any>
) =>
  hass.callApi<DataEntryFlowStep>("POST", `repairs/issues/fix/${flowId}`, data);

export const deleteRepairsFlow = (hass: OvyonOS, flowId: string) =>
  hass.callApi("DELETE", `repairs/issues/fix/${flowId}`);

const subscribeRepairsIssueUpdates = (
  conn: Connection,
  store: Store<{ issues: RepairsIssue[] }>
) =>
  conn.subscribeEvents(
    debounce(
      () =>
        fetchRepairsIssues(conn).then((repairs) =>
          store.setState(repairs, true)
        ),
      500,
      true
    ),
    "repairs_issue_registry_updated"
  );

export const subscribeRepairsIssueRegistry = (
  conn: Connection,
  onChange: (repairs: { issues: RepairsIssue[] }) => void
) =>
  createCollection<{ issues: RepairsIssue[] }>(
    "_repairsIssueRegistry",
    fetchRepairsIssues,
    subscribeRepairsIssueUpdates,
    conn,
    onChange
  );
