import { type PropFunction, component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { type Post } from "@prisma/client";
import ago from "s-ago";

export default component$<{
  post: Post;
  onClick$?: PropFunction<() => void>;
}>(({ post, onClick$ }) => {
  return (
    <li
      key={post.id}
      class={{
        "mb-10 ml-4": true,
        "text-sky-100": post.readAt === null, // Post unread
        "text-sky-600": post.readAt !== null, // Post read
      }}
    >
      <Link onClick$={onClick$} href={post.url} target="_blank">
        <div class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
        <time class="mb-1 text-sm font-normal leading-none">
          {ago(post.publishedAt)}
        </time>
        <h3 class="text-lg font-semibold">{post.title}</h3>
        <p class="text-base font-normal">{post.content}</p>
      </Link>
    </li>
  );
});
