import type { PageNavigation } from "../../layouts/hass-tabs-subpage";
import type { OvyonOS } from "../../types";
import { ensureArray } from "../array/ensure-array";
import { isComponentLoaded } from "./is_component_loaded";

export const canShowPage = (hass: OvyonOS, page: PageNavigation) =>
  isCore(page) || isLoadedIntegration(hass, page);

export const isLoadedIntegration = (
  hass: OvyonOS,
  page: PageNavigation
) =>
  !page.component ||
  ensureArray(page.component).some((integration) =>
    isComponentLoaded(hass.config, integration)
  );

export const isCore = (page: PageNavigation) => page.core;
