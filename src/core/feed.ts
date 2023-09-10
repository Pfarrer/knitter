import { PrismaClient, type Feed } from "@prisma/client";
import Parser from "rss-parser";

export async function fetchFeed(feed: Feed) {
  const prisma = new PrismaClient();

  const fetchDate = new Date();
  const parsed = await new Parser().parseURL(feed.url);

  const newPosts = await Promise.all(parsed.items
    .filter((item) => !!item.title && !!item.link)
    .filter((item) => {
      const itemDate = item.pubDate ? new Date(item.pubDate) : fetchDate;
      return itemDate > feed.fetchedAt;
    })
    .map((item) =>
      prisma.post.create({
        data: {
          publishedAt: item.pubDate ? new Date(item.pubDate) : fetchDate,
          title: item.title!,
          content: item.summary,
          url: item.link!,
          feedId: feed.id,
        },
      })
    ));

  await prisma.feed.update({
    where: { id: feed.id },
    data: { fetchedAt: fetchDate },
  });

  return newPosts;
}
