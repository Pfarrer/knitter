import { component$, useComputed$ } from "@builder.io/qwik";
import { Link, useLocation } from "@builder.io/qwik-city";
import { type Feed } from "@prisma/client";
import { getChannels } from "~/core/channels";

export const SideMenu = component$<{
  feeds: Feed[];
}>(({ feeds }) => {
  const feedLinks = useComputed$(() => {
    return feeds.map((feed) => ({
      url: `/feeds/${feed.id}/`,
      text: feed.title,
    }));
  });

  const channels = getChannels().map((channel) => ({
    url: `/channels/${channel.id}/`,
    text: channel.name,
  }));
  const others = [
    { url: "/feeds/add/", text: "Add Feed" },
    { url: "/settings/", text: "Settings" },
  ];

  return (
    <>
      <SideMenuSection name="Channels" links={channels} />
      <SideMenuSection name="Feeds" links={feedLinks.value} />
      <SideMenuSection links={others} />
    </>
  );
});

export const SideMenuSection = component$<{
  name?: string;
  links: Array<{ url: string; text: string }>;
}>(({ name, links }) => {
  if (links.length === 0) {
    return <></>;
  }

  const loc = useLocation();

  return (
    <section class="mb-4">
      {name ? (
        <span class="uppercase text-2xs text-sky-600">{name}</span>
      ) : (
        <></>
      )}
      <ul>
        {links.map(({ url, text }) => (
          <li
            key={url}
            class={{
              "text-sky-200": loc.url.pathname === url,
              "text-sky-500": loc.url.pathname !== url,
            }}
          >
            <Link href={url}>{text}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
});
