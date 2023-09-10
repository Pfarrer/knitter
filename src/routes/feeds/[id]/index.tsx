import { $, component$ } from "@builder.io/qwik";
import {
  type DocumentHead,
  routeLoader$,
  routeAction$,
  Link,
} from "@builder.io/qwik-city";
import { Post, PrismaClient } from "@prisma/client";
import Button from "~/components/button/button";
import PostListElement from "~/components/post-list-element/post-list-element";
import { fetchFeed } from "~/core/feed";

export const usePosts = routeLoader$(async (requestEvent) => {
  const prisma = new PrismaClient();
  return prisma.post.findMany({
    where: { feedId: +requestEvent.params.id },
    orderBy: { publishedAt: "desc" },
  });
});

export const useFetchFeed = routeAction$(async (_, requestEvent) => {
  const prisma = new PrismaClient();
  const feed = await prisma.feed.findUnique({
    where: { id: +requestEvent.params.id },
  });

  return await fetchFeed(feed!);
});

export const useMarkPostAsRead = routeAction$(async (post) => {
  const prisma = new PrismaClient();
  await prisma.post.update({
    where: { id: +post.id },
    data: { readAt: new Date() },
  });
});

export default component$(() => {
  const posts = usePosts();
  const fetchAction = useFetchFeed();
  const markPostAsReadAction = useMarkPostAsRead();

  return (
    <>
      <Button onClick$={() => fetchAction.submit().then()}>Fetch</Button>
      <ol class="relative border-l border-gray-200 dark:border-gray-700">
        {posts.value.map((post) => (
          <PostListElement
            key={post.id}
            post={post}
            onClick$={() => markPostAsReadAction.submit(post).then()}
          />
        ))}
      </ol>
    </>
  );
});

export const head: DocumentHead = {
  title: "Knitter",
};
