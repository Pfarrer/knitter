import { component$ } from "@builder.io/qwik";
import {
  routeLoader$,
  type DocumentHead,
  routeAction$,
} from "@builder.io/qwik-city";
import { PrismaClient } from "@prisma/client";
import PostListElement from "~/components/post-list-element/post-list-element";

export const usePosts = routeLoader$(async () => {
  const prisma = new PrismaClient();
  return prisma.post.findMany({
    where: { },
    orderBy: { publishedAt: "desc" },
    take: 20
  });
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
  const markPostAsReadAction = useMarkPostAsRead();

  return (
    <ol class="relative border-l border-gray-200 dark:border-gray-700">
      {posts.value.map((post) => (
        <PostListElement
          key={post.id}
          post={post}
          onClick$={() => markPostAsReadAction.submit(post).then()}
        />
      ))}
    </ol>
  );
});

export const head: DocumentHead = {
  title: "Knitter",
};
