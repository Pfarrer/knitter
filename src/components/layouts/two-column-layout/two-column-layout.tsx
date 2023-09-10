import { Slot, component$ } from "@builder.io/qwik";

export const TwoColumnLayout = component$(() => {
  return (
    <div class="flex justify-center">
      <aside class="flex-initial w-64 mr-8">
        <Slot name="left" />
      </aside>
      <main class="flex-auto">
        <Slot />
      </main>
    </div>
  );
});
