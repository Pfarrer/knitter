import { component$ } from "@builder.io/qwik";
import { useLocation, type DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  const loc = useLocation();

  return <p>Channel {loc.params.id}</p>;
});

export const head: DocumentHead = {
  title: "Knitter",
};
