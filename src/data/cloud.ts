import type { EntityDomainFilter } from "../common/entity/entity_domain_filter";
import type { OvyonOS } from "../types";

type StrictConnectionMode = "disabled" | "guard_page" | "drop_connection";

interface CloudStatusNotLoggedIn {
  logged_in: false;
  cloud: "disconnected" | "connecting" | "connected";
  http_use_ssl: boolean;
}

export interface CertificateInformation {
  common_name: string;
  expire_date: string;
  fingerprint: string;
  alternative_names: string[];
}

export interface CloudPreferences {
  google_enabled: boolean;
  alexa_enabled: boolean;
  remote_enabled: boolean;
  remote_allow_remote_enable: boolean;
  strict_connection: StrictConnectionMode;
  google_secure_devices_pin: string | undefined;
  cloudhooks: Record<string, CloudWebhook>;
  alexa_report_state: boolean;
  google_report_state: boolean;
  tts_default_voice: [string, string];
  cloud_ice_servers_enabled: boolean;
}

export interface CloudStatusLoggedIn {
  logged_in: true;
  cloud: "disconnected" | "connecting" | "connected";
  cloud_last_disconnect_reason: { clean: boolean; reason: string } | null;
  email: string;
  google_registered: boolean;
  google_entities: EntityDomainFilter;
  google_domains: string[];
  alexa_registered: boolean;
  alexa_entities: EntityDomainFilter;
  prefs: CloudPreferences;
  remote_domain: string | undefined;
  remote_connected: boolean;
  remote_certificate: undefined | CertificateInformation;
  remote_certificate_status:
    | null
    | "error"
    | "generating"
    | "loaded"
    | "loading"
    | "ready";
  http_use_ssl: boolean;
  active_subscription: boolean;
}

export type CloudStatus = CloudStatusNotLoggedIn | CloudStatusLoggedIn;

export interface SubscriptionInfo {
  human_description: string;
  provider: string;
  plan_renewal_date?: number;
}

export interface CloudWebhook {
  webhook_id: string;
  cloudhook_id: string;
  cloudhook_url: string;
  managed?: boolean;
}

interface CloudLoginBase {
  hass: OvyonOS;
  email: string;
  check_connection?: boolean;
}

export interface CloudLoginPassword extends CloudLoginBase {
  password: string;
}

export interface CloudLoginMFA extends CloudLoginBase {
  code: string;
}

export const cloudLogin = ({
  hass,
  ...rest
}: CloudLoginPassword | CloudLoginMFA) =>
  hass.callApi<{ success: boolean; cloud_pipeline?: string }>(
    "POST",
    "cloud/login",
    rest
  );

export const cloudLogout = (hass: OvyonOS) =>
  hass.callApi("POST", "cloud/logout");

export const cloudForgotPassword = (hass: OvyonOS, email: string) =>
  hass.callApi("POST", "cloud/forgot_password", {
    email,
  });

export const cloudRegister = (
  hass: OvyonOS,
  email: string,
  password: string
) =>
  hass.callApi("POST", "cloud/register", {
    email,
    password,
  });

export const cloudResendVerification = (hass: OvyonOS, email: string) =>
  hass.callApi("POST", "cloud/resend_confirm", {
    email,
  });

export const fetchCloudStatus = (hass: OvyonOS) =>
  hass.callWS<CloudStatus>({ type: "cloud/status" });

export const createCloudhook = (hass: OvyonOS, webhookId: string) =>
  hass.callWS<CloudWebhook>({
    type: "cloud/cloudhook/create",
    webhook_id: webhookId,
  });

export const deleteCloudhook = (hass: OvyonOS, webhookId: string) =>
  hass.callWS({
    type: "cloud/cloudhook/delete",
    webhook_id: webhookId,
  });

export const connectCloudRemote = (hass: OvyonOS) =>
  hass.callWS({
    type: "cloud/remote/connect",
  });

export const disconnectCloudRemote = (hass: OvyonOS) =>
  hass.callWS({
    type: "cloud/remote/disconnect",
  });

export const fetchCloudSubscriptionInfo = (hass: OvyonOS) =>
  hass.callWS<SubscriptionInfo>({ type: "cloud/subscription" });

export const updateCloudPref = (
  hass: OvyonOS,
  prefs: {
    google_enabled?: CloudPreferences["google_enabled"];
    alexa_enabled?: CloudPreferences["alexa_enabled"];
    alexa_report_state?: CloudPreferences["alexa_report_state"];
    google_report_state?: CloudPreferences["google_report_state"];
    google_secure_devices_pin?: CloudPreferences["google_secure_devices_pin"];
    tts_default_voice?: CloudPreferences["tts_default_voice"];
    remote_allow_remote_enable?: CloudPreferences["remote_allow_remote_enable"];
    strict_connection?: CloudPreferences["strict_connection"];
    cloud_ice_servers_enabled?: CloudPreferences["cloud_ice_servers_enabled"];
  }
) =>
  hass.callWS({
    type: "cloud/update_prefs",
    ...prefs,
  });

export const removeCloudData = (hass: OvyonOS) =>
  hass.callWS({
    type: "cloud/remove_data",
  });

export const updateCloudGoogleEntityConfig = (
  hass: OvyonOS,
  entity_id: string,
  disable_2fa: boolean
) =>
  hass.callWS({
    type: "cloud/google_assistant/entities/update",
    entity_id,
    disable_2fa,
  });

export const cloudSyncGoogleAssistant = (hass: OvyonOS) =>
  hass.callApi("POST", "cloud/google_actions/sync");

export const fetchSupportPackage = (hass: OvyonOS) =>
  hass.callApi<string>("GET", "cloud/support_package");
