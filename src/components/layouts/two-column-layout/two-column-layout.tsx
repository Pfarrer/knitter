import { Slot, component$ } from "@builder.io/qwik";
import { SideMenu } from "~/components/side-menu/side-menu";

export const TwoColumnLayout = component$(() => {
  return (
    <div class="flex justify-center">
      <aside class="flex-initial w-64 mr-8">
        <SideMenu />
      </aside>
      <main class="flex-auto">
        <Slot />
      </main>
    </div>
  );
});
