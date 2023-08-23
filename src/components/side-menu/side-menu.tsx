import { component$ } from "@builder.io/qwik";
import { Link, useLocation } from "@builder.io/qwik-city";
import { getChannels } from "~/core/channels";
import { getFeeds } from "~/core/feeds";

export const SideMenu = component$(() => {
  const channels = getChannels().map((channel) => ({
    url: "/channels/" + channel.id,
    text: channel.name,
  }));
  const feeds = getFeeds().map((feed) => ({
    url: "/feeds/" + feed.id,
    text: feed.name,
  }));
  const others = [{ url: "/settings", text: "Settings" }];

  return (
    <>
      <SideMenuSection name="Channels" links={channels} />
      <SideMenuSection name="Feeds" links={feeds} />
      <SideMenuSection links={others} />
    </>
  );
});

interface SideMenuSectionProps {
  name?: string;
  links: Array<{ url: string; text: string }>;
}

export const SideMenuSection = component$((props: SideMenuSectionProps) => {
  if (props.links.length === 0) {
    return <></>;
  }

  const loc = useLocation();

  return (
    <section class="mb-4">
      {props.name ? (
        <span class="uppercase text-2xs text-sky-600">{props.name}</span>
      ) : (
        <></>
      )}
      <ul>
        {props.links.map(({ url, text }) => (
          <li
            key={url}
            class={{
              "text-sky-200": loc.url.pathname.startsWith(url),
              "text-sky-500": !loc.url.pathname.startsWith(url),
            }}
          >
            <Link href={url}>{text}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
});
