import { component$, Slot } from "@builder.io/qwik";
import { TwoColumnLayout } from "~/components/layouts/two-column-layout/two-column-layout";

export default component$(() => {
  return (
    <TwoColumnLayout>
      <Slot />
    </TwoColumnLayout>
  );
});
