import { component$ } from "@builder.io/qwik";
import { Link, routeLoader$ } from "@builder.io/qwik-city";
import { type Feed, PrismaClient } from "@prisma/client";

export const useSeeder = routeLoader$(async (requestEvent) => {
  const prisma = new PrismaClient();
  if ((await prisma.feed.findMany()).length > 0) {
    throw requestEvent.error(409, "Database not empty");
  }

  await prisma.feed.create({
    data: {
      title: "NYT World",
      url: "https://rss.nytimes.com/services/xml/rss/nyt/World.xml",
      createdAt: new Date(),
      fetchedAt: new Date("1970-01-01"),
    },
  });
  await prisma.feed.create({
    data: {
      title: "Tagesschau",
      url: "https://www.tagesschau.de/infoservices/alle-meldungen-100~rss2.xml",
      createdAt: new Date(),
      fetchedAt: new Date("1970-01-01"),
    },
  });
  await prisma.feed.create({
    data: {
      title: "YCombinator",
      url: "https://news.ycombinator.com/rss",
      createdAt: new Date(),
      fetchedAt: new Date("1970-01-01"),
    },
  });
  await prisma.feed.create({
    data: {
      title: "Lobsters",
      url: "https://lobste.rs/rss",
      createdAt: new Date(),
      fetchedAt: new Date("1970-01-01"),
    },
  });
  await prisma.feed.create({
    data: {
      title: "Vaultwarden",
      url: "https://github.com/dani-garcia/vaultwarden/releases.atom",
      createdAt: new Date(),
      fetchedAt: new Date("1970-01-01"),
    },
  });
});

export default component$(() => {
  useSeeder();
  return (
    <>
      <p>Done</p>
      <Link href="/">Go Home</Link>
    </>
  );
});
