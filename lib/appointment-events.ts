/** Custom DOM event used to preselect a service in the appointment form. */
export const SELECT_SERVICE_EVENT = "elstom:select-service";

export function selectService(slug: string) {
  window.dispatchEvent(new CustomEvent<string>(SELECT_SERVICE_EVENT, { detail: slug }));
}
