import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";

export const useRedirect = routeLoader$(async (requestEvent) => {
  throw requestEvent.redirect(302, "/channels/timeline");
});

export default component$(() => {
  useRedirect();
  return <></>;
});