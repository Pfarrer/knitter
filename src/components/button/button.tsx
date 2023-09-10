import { type PropFunction, Slot, component$ } from "@builder.io/qwik";

export default component$<{
  onClick$?: PropFunction<() => void>;
}>((props) => {
  return (
    <button
      onClick$={props.onClick$}
      type="button"
      class="text-sky-100 bg-blue-700 hover:text-sky-50 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
    >
      <Slot />
    </button>
  );
});
