import { component$, Slot } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { PrismaClient } from "@prisma/client";
import { TwoColumnLayout } from "~/components/layouts/two-column-layout/two-column-layout";
import { SideMenu } from "~/components/side-menu/side-menu";

export const useFeeds = routeLoader$(async () => {
  const prisma = new PrismaClient();
  return prisma.feed.findMany();
});

export default component$(() => {
  const feeds = useFeeds();

  return (
    <TwoColumnLayout>
      <SideMenu q:slot="left" feeds={feeds.value} />
      <Slot />
    </TwoColumnLayout>
  );
});
