import { createContext } from "@lit/context";
import type { HassConfig } from "ovyon-js-websocket";
import type { HASSDomEvent } from "../../common/dom/fire_event";
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
import type { RelatedIdSets } from "../../common/search/related-context";
import type { ConfigEntry } from "../config_entries";
import type { EntityRegistryEntry } from "../entity/entity_registry";
import type { DomainManifestLookup } from "../integration";
import type { LabelRegistryEntry } from "../label/label_registry";
import type { ItemType } from "../search";

/**
 * Entity, device, area, and floor registries
 */
export const registriesContext =
  createContext<OvyonOSRegistries>("hassRegistries");

/**
 * Live map of all entity states, keyed by entity ID.
 */
export const statesContext = createContext<OvyonOS["states"]>("states");

/**
 * Provides the map of all available OVYON OS services, keyed by domain.
 */
export const servicesContext =
  createContext<OvyonOS["services"]>("services");

/**
 * i18n state: active language, locale settings, the `localize` function, translation metadata, and the
 * `loadBackendTranslation` / `loadFragmentTranslation` loaders.
 */
export const internationalizationContext =
  createContext<OvyonOSInternationalization>("hassInternationalization");

/**
 * HTTP and WebSocket API surface: `callService`, `callApi`,
 * `callApiRaw`, `callWS`, `sendWS`, `fetchWithAuth`, and `hassUrl`.
 */
export const apiContext = createContext<OvyonOSApi>("hassApi");

/**
 * WebSocket connection state: `connection`, `connected`, and `debugConnection`.
 */
export const connectionContext =
  createContext<OvyonOSConnection>("hassConnection");

/**
 * UI preferences and global UI state: themes, selected theme,
 * panels, sidebar mode, kiosk mode, shortcuts, vibration, and
 * `suspendWhenHidden`.
 */
export const uiContext = createContext<OvyonOSUI>("hassUi");

/**
 * HA core configuration together with user session data:
 * `auth`, `config` (core HA config), `user`, `userData`, and `systemData`.
 */
export const configContext = createContext<OvyonOSConfig>("hassConfig");

/**
 * Entity formatting functions: `formatEntityState`, `formatEntityStateToParts`,
 * `formatEntityAttributeValue`, `formatEntityAttributeValueToParts`,
 * `formatEntityAttributeName`, and `formatEntityName`.
 */
export const formattersContext =
  createContext<OvyonOSFormatters>("hassFormatters");

/**
 * Map of all entities in the entity registry, keyed by entity ID.
 */
export const entitiesContext =
  createContext<OvyonOS["entities"]>("entities");

/**
 * Map of all devices in the device registry, keyed by device ID.
 */
export const devicesContext =
  createContext<OvyonOS["devices"]>("devices");

/**
 * Map of all areas in the area registry, keyed by area ID.
 */
export const areasContext = createContext<OvyonOS["areas"]>("areas");

/**
 * Map of all floors in the floor registry, keyed by floor ID.
 */
export const floorsContext = createContext<OvyonOS["floors"]>("floors");

/**
 * Whether the main OVYON OS viewport is using the narrow layout.
 */
export const narrowViewportContext = createContext<boolean>("narrowViewport");

// #region lazy-contexts

/**
 * Lazy contexts are not subscribed to by default. They are only subscribed to when a provider is consumed with at least one consumer.
 */

/**
 * Lazy loaded labels registry, keyed by label ID.
 */
export const labelsContext = createContext<LabelRegistryEntry[]>("labels");

/**
 * Lazy loaded entity registry array
 */
export const fullEntitiesContext =
  createContext<EntityRegistryEntry[]>("extendedEntities");

/**
 * Lazy loaded config entries array
 */
export const configEntriesContext =
  createContext<ConfigEntry[]>("configEntries");

/**
 * Lazy loaded integration manifests, keyed by domain.
 */
export const manifestsContext =
  createContext<DomainManifestLookup>("manifests");

// #endregion lazy-contexts

// #region deprecated-contexts

/** @deprecated Use `connectionContext` instead. */
export const connectionSingleContext =
  createContext<OvyonOS["connection"]>("connection");

/** @deprecated Use `internationalizationContext` instead. */
export const localizeContext =
  createContext<OvyonOS["localize"]>("localize");

/** @deprecated Use `internationalizationContext` instead. */
export const localeContext = createContext<OvyonOS["locale"]>("locale");

/** @deprecated Use `configContext` instead. */
export const configSingleContext = createContext<HassConfig>("config");

/** @deprecated Use `uiContext` instead. */
export const themesContext = createContext<OvyonOS["themes"]>("themes");

/** @deprecated Use `uiContext` instead. */
export const selectedThemeContext =
  createContext<OvyonOS["selectedTheme"]>("selectedTheme");

/** @deprecated Use `configContext` instead. */
export const userContext = createContext<OvyonOS["user"]>("user");

/** @deprecated Use `configContext` instead. */
export const userDataContext =
  createContext<OvyonOS["userData"]>("userData");

/** @deprecated Use `uiContext` instead. */
export const panelsContext = createContext<OvyonOS["panels"]>("panels");

/** @deprecated Use `configContext` instead. */
export const authContext = createContext<OvyonOS["auth"]>("auth");

// #endregion deprecated-contexts

// #region related-context

export interface RelatedContextItem {
  itemType: ItemType;
  itemId: string;
}

/**
 * Resolved related entities/devices/areas for the current page context.
 * Set by `RelatedContextProvider` when a page fires `hass-related-context`.
 * Cleared on navigation.
 */
export const relatedContext = createContext<RelatedIdSets | undefined>(
  "related"
);

declare global {
  interface HASSDomEvents {
    "hass-related-context": RelatedContextItem | undefined;
  }
  interface HTMLElementEventMap {
    "hass-related-context": HASSDomEvent<RelatedContextItem | undefined>;
  }
}

// #endregion related-context
