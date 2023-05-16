import Avatar from "deco-sites/fashion/components/ui/Avatar.tsx";
import type {
  Filter,
  FilterToggle,
  ProductListingPage,
} from "deco-sites/std/commerce/types.ts";

interface Props {
  filters: ProductListingPage["filters"];
}

const isToggle = (filter: Filter): filter is FilterToggle =>
  filter["@type"] === "FilterToggle";

function FilterValues({ key, values }: FilterToggle) {
  const flexDirection = key === "tamanho" || key === "cor"
    ? "flex-row"
    : "flex-col";

  return (
    <ul class={`flex flex-wrap gap-2 mt-2 ${flexDirection}`}>
      {values.map(({ label, value, url, selected, quantity }) => {
        if (key === "cor" || key === "tamanho") {
          return (
            <a href={url}>
              <Avatar
                content={value}
                variant={selected ? "active" : "default"}
              />
            </a>
          );
        }

        return (
          <a href={url} class="flex items-center gap-2">
            <div aria-checked={selected} class="checkbox w-3 h-3" />
            <span class="text-sm">{label}</span>
            <span class="text-sm text-base-300">({quantity})</span>
          </a>
        );
      })}
    </ul>
  );
}

function Filters({ filters }: Props) {
  return (
    <ul class="flex flex-col gap-4 py-4">
      {filters
        .filter(isToggle)
        .map((filter) => (
          <li class="flex flex-col gap-4 border border-stone-500 p-2 rounded-md bg-white">
            <details class="relative group">
              <summary class=" uppercase after:content-[''] after:right-0 after:w-2 after:h-2 after:border-default after:border-r after:border-t after:rotate-45 after:absolute after:top-[6px] group-open:after:rotate-[135deg] marker:content-[''] ease-in duration-500 text-sm">
                {filter.label}
              </summary>
              <FilterValues {...filter} />
            </details>
          </li>
        ))}
    </ul>
  );
}

export default Filters;
