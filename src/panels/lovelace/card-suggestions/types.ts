import type { LovelaceCardConfig } from "../../../data/lovelace/config/card";
import type { OvyonOS } from "../../../types";

export interface CardSuggestion<
  T extends LovelaceCardConfig = LovelaceCardConfig,
> {
  label?: string;
  config: T;
}

export interface CardSuggestionProvider<
  T extends LovelaceCardConfig = LovelaceCardConfig,
> {
  getEntitySuggestion(
    hass: OvyonOS,
    entityId: string
  ): CardSuggestion<T> | CardSuggestion<T>[] | null;
}
