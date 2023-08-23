import { component$ } from "@builder.io/qwik";
import { type DocumentHead, routeLoader$ } from "@builder.io/qwik-city";
import Parser from "rss-parser";
import { getFeeds } from "~/core/feeds";

export const usePosts = routeLoader$(async (requestEvent) => {
  const feed = getFeeds().find((feed) => feed.id === requestEvent.params.id);
  if (feed?.url) {
    const parsed = await new Parser().parseURL(feed.url);
    return parsed.items.map((item) => ({
      id: item.link,
      publishedAt: item.pubDate,
      title: item.title,
      summary: item.summary,
      url: item.link,
    }));
  }

  return [];
});

export default component$(() => {
  // const { params } = useLocation();
  const posts = usePosts();
  console.log(posts);

  return (
    <ol class="relative border-l border-gray-200 dark:border-gray-700">
      {posts.value.map((post) => (
        <li key={post.id} class="mb-10 ml-4">
          <a href={post.url} target="_blank">
            <div class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
            <time class="mb-1 text-sm font-normal leading-none">
              {post.publishedAt}
            </time>
            <h3 class="text-lg font-semibold">{post.title}</h3>
            <p class="text-base font-normal">{post.summary}</p>
          </a>
        </li>
      ))}
    </ol>
  );
});

export const head: DocumentHead = {
  title: "Knitter",
};
