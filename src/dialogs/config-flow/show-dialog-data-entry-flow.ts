import type { TemplateResult } from "lit";
import { fireEvent } from "../../common/dom/fire_event";
import type { HaFormSchema } from "../../components/ha-form/types";
import type {
  DataEntryFlowStep,
  DataEntryFlowStepAbort,
  DataEntryFlowStepCreateEntry,
  DataEntryFlowStepExternal,
  DataEntryFlowStepForm,
  DataEntryFlowStepMenu,
  DataEntryFlowStepProgress,
  FlowType,
} from "../../data/data_entry_flow";
import type { IntegrationManifest } from "../../data/integration";
import type { OvyonOS } from "../../types";

export interface FlowConfig {
  flowType: FlowType;

  showDevices: boolean;

  createFlow(hass: OvyonOS, handler: string): Promise<DataEntryFlowStep>;

  fetchFlow(hass: OvyonOS, flowId: string): Promise<DataEntryFlowStep>;

  handleFlowStep(
    hass: OvyonOS,
    flowId: string,
    data: Record<string, any>
  ): Promise<DataEntryFlowStep>;

  deleteFlow(hass: OvyonOS, flowId: string): Promise<unknown>;

  renderAbortHeader?(hass: OvyonOS, step: DataEntryFlowStepAbort): string;

  renderAbortSubheader?(
    hass: OvyonOS,
    step: DataEntryFlowStepAbort
  ): string | TemplateResult;

  renderAbortDescription(
    hass: OvyonOS,
    step: DataEntryFlowStepAbort
  ): TemplateResult | string;

  renderShowFormStepHeader(
    hass: OvyonOS,
    step: DataEntryFlowStepForm
  ): string;

  renderShowFormStepSubheader?(
    hass: OvyonOS,
    step: DataEntryFlowStepForm
  ): string | TemplateResult;

  renderShowFormStepDescription(
    hass: OvyonOS,
    step: DataEntryFlowStepForm
  ): TemplateResult | "";

  renderShowFormStepFieldLabel(
    hass: OvyonOS,
    step: DataEntryFlowStepForm,
    field: HaFormSchema,
    options: { path?: string[]; [key: string]: any }
  ): string;

  renderShowFormStepFieldHelper(
    hass: OvyonOS,
    step: DataEntryFlowStepForm,
    field: HaFormSchema,
    options: { path?: string[]; [key: string]: any }
  ): TemplateResult | string;

  renderShowFormStepFieldError(
    hass: OvyonOS,
    step: DataEntryFlowStepForm,
    error: string
  ): string;

  renderShowFormStepFieldLocalizeValue(
    hass: OvyonOS,
    step: DataEntryFlowStepForm,
    key: string
  ): string;

  renderShowFormStepSubmitButton(
    hass: OvyonOS,
    step: DataEntryFlowStepForm
  ): string;

  renderExternalStepHeader(
    hass: OvyonOS,
    step: DataEntryFlowStepExternal
  ): string;

  renderExternalStepDescription(
    hass: OvyonOS,
    step: DataEntryFlowStepExternal
  ): TemplateResult | "";

  renderCreateEntryDescription(
    hass: OvyonOS,
    step: DataEntryFlowStepCreateEntry
  ): TemplateResult | "";

  renderShowFormProgressHeader(
    hass: OvyonOS,
    step: DataEntryFlowStepProgress
  ): string;

  renderShowFormProgressSubheader?(
    hass: OvyonOS,
    step: DataEntryFlowStepProgress
  ): string | TemplateResult;

  renderShowFormProgressDescription(
    hass: OvyonOS,
    step: DataEntryFlowStepProgress
  ): TemplateResult | "";

  renderMenuHeader(hass: OvyonOS, step: DataEntryFlowStepMenu): string;

  renderMenuSubheader?(
    hass: OvyonOS,
    step: DataEntryFlowStepMenu
  ): string | TemplateResult;

  renderMenuDescription(
    hass: OvyonOS,
    step: DataEntryFlowStepMenu
  ): TemplateResult | "";

  renderMenuOption(
    hass: OvyonOS,
    step: DataEntryFlowStepMenu,
    option: string
  ): string;

  renderMenuOptionDescription(
    hass: OvyonOS,
    step: DataEntryFlowStepMenu,
    option: string
  ): string;

  renderLoadingDescription(
    hass: OvyonOS,
    loadingReason: LoadingReason,
    handler?: string,
    step?: DataEntryFlowStep | null
  ): string;
}

export type LoadingReason =
  | "loading_handlers"
  | "loading_flow"
  | "loading_step";

export interface DataEntryFlowDialogParams {
  startFlowHandler?: string;
  searchQuery?: string;
  continueFlowId?: string;
  manifest?: IntegrationManifest | null;
  domain?: string;
  dialogClosedCallback?: (params: {
    flowFinished: boolean;
    entryId?: string;
  }) => void;
  flowConfig: FlowConfig;
  dialogParentElement?: HTMLElement;
  navigateToResult?: boolean;
  carryOverDevices?: string[];
}

export const loadDataEntryFlowDialog = () => import("./dialog-data-entry-flow");

export const showFlowDialog = (
  element: HTMLElement,
  dialogParams: Omit<DataEntryFlowDialogParams, "flowConfig">,
  flowConfig: FlowConfig
): void => {
  fireEvent(element, "show-dialog", {
    dialogTag: "dialog-data-entry-flow",
    dialogImport: loadDataEntryFlowDialog,
    dialogParams: {
      ...dialogParams,
      flowConfig,
      dialogParentElement: element,
    },
  });
};
