import type {
  OvyonOS,
  OvyonOSApi,
  OvyonOSConfig,
  OvyonOSConnection,
  OvyonOSFormatters,
  OvyonOSInternationalization,
  OvyonOSRegistries,
  OvyonOSUI,
} from "../../types";

const updateRegistries = (
  hass: OvyonOS,
  value?: OvyonOSRegistries
): OvyonOSRegistries => {
  if (
    !value ||
    value.entities !== hass.entities ||
    value.devices !== hass.devices ||
    value.areas !== hass.areas ||
    value.floors !== hass.floors
  ) {
    return {
      entities: hass.entities,
      devices: hass.devices,
      areas: hass.areas,
      floors: hass.floors,
    };
  }
  return value;
};

const updateInternationalization = (
  hass: OvyonOS,
  value?: OvyonOSInternationalization
): OvyonOSInternationalization => {
  if (
    !value ||
    value.localize !== hass.localize ||
    value.locale !== hass.locale ||
    value.loadBackendTranslation !== hass.loadBackendTranslation ||
    value.loadFragmentTranslation !== hass.loadFragmentTranslation ||
    value.language !== hass.language ||
    value.selectedLanguage !== hass.selectedLanguage ||
    value.translationMetadata !== hass.translationMetadata
  ) {
    return {
      localize: hass.localize,
      locale: hass.locale,
      loadBackendTranslation: hass.loadBackendTranslation,
      loadFragmentTranslation: hass.loadFragmentTranslation,
      language: hass.language,
      selectedLanguage: hass.selectedLanguage,
      translationMetadata: hass.translationMetadata,
    };
  }
  return value;
};

const updateApi = (
  hass: OvyonOS,
  value?: OvyonOSApi
): OvyonOSApi => {
  if (
    !value ||
    value.callService !== hass.callService ||
    value.callApi !== hass.callApi ||
    value.callApiRaw !== hass.callApiRaw ||
    value.callWS !== hass.callWS ||
    value.sendWS !== hass.sendWS ||
    value.fetchWithAuth !== hass.fetchWithAuth
  ) {
    return {
      callService: hass.callService,
      callApi: hass.callApi,
      callApiRaw: hass.callApiRaw,
      callWS: hass.callWS,
      sendWS: hass.sendWS,
      fetchWithAuth: hass.fetchWithAuth,
    };
  }
  return value;
};

const updateConnection = (
  hass: OvyonOS,
  value?: OvyonOSConnection
): OvyonOSConnection => {
  if (
    !value ||
    value.connection !== hass.connection ||
    value.connected !== hass.connected ||
    value.debugConnection !== hass.debugConnection ||
    value.hassUrl !== hass.hassUrl
  ) {
    return {
      connection: hass.connection,
      connected: hass.connected,
      debugConnection: hass.debugConnection,
      hassUrl: hass.hassUrl,
    };
  }
  return value;
};

const updateUi = (
  hass: OvyonOS,
  value?: OvyonOSUI
): OvyonOSUI => {
  if (
    !value ||
    value.themes !== hass.themes ||
    value.selectedTheme !== hass.selectedTheme ||
    value.panels !== hass.panels ||
    value.panelUrl !== hass.panelUrl ||
    value.dockedSidebar !== hass.dockedSidebar ||
    value.kioskMode !== hass.kioskMode ||
    value.enableShortcuts !== hass.enableShortcuts ||
    value.vibrate !== hass.vibrate ||
    value.suspendWhenHidden !== hass.suspendWhenHidden
  ) {
    return {
      themes: hass.themes,
      selectedTheme: hass.selectedTheme,
      panels: hass.panels,
      panelUrl: hass.panelUrl,
      dockedSidebar: hass.dockedSidebar,
      kioskMode: hass.kioskMode,
      enableShortcuts: hass.enableShortcuts,
      vibrate: hass.vibrate,
      suspendWhenHidden: hass.suspendWhenHidden,
    };
  }
  return value;
};

const updateConfig = (
  hass: OvyonOS,
  value?: OvyonOSConfig
): OvyonOSConfig => {
  if (
    !value ||
    value.auth !== hass.auth ||
    value.config !== hass.config ||
    value.user !== hass.user ||
    value.userData !== hass.userData ||
    value.systemData !== hass.systemData
  ) {
    return {
      auth: hass.auth,
      config: hass.config,
      user: hass.user,
      userData: hass.userData,
      systemData: hass.systemData,
    };
  }
  return value;
};

const updateFormatters = (
  hass: OvyonOS,
  value?: OvyonOSFormatters
): OvyonOSFormatters => {
  if (
    !value ||
    value.formatEntityState !== hass.formatEntityState ||
    value.formatEntityStateToParts !== hass.formatEntityStateToParts ||
    value.formatEntityAttributeValue !== hass.formatEntityAttributeValue ||
    value.formatEntityAttributeValueToParts !==
      hass.formatEntityAttributeValueToParts ||
    value.formatEntityAttributeName !== hass.formatEntityAttributeName ||
    value.formatEntityName !== hass.formatEntityName
  ) {
    return {
      formatEntityState: hass.formatEntityState,
      formatEntityStateToParts: hass.formatEntityStateToParts,
      formatEntityAttributeValue: hass.formatEntityAttributeValue,
      formatEntityAttributeValueToParts: hass.formatEntityAttributeValueToParts,
      formatEntityAttributeName: hass.formatEntityAttributeName,
      formatEntityName: hass.formatEntityName,
    };
  }
  return value;
};

export const updateHassGroups = {
  registries: updateRegistries,
  internationalization: updateInternationalization,
  api: updateApi,
  connection: updateConnection,
  ui: updateUi,
  config: updateConfig,
  formatters: updateFormatters,
};
