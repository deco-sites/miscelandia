import type { BreadcrumbList } from "deco-sites/std/commerce/types.ts";

interface Props {
  itemListElement: BreadcrumbList["itemListElement"];
}

function Breadcrumb({ itemListElement = [] }: Props) {
  const items = [{ name: "Home", item: "/" }, ...itemListElement];

  return (
    <div class="text-caption breadcrumbs">
      <ul class="flex flex-wrap text-text-color-secord uppercase text-sm font-firaSans">
        {items
          .filter(({ name, item }) => name && item)
          .map(({ name, item }) => (
            <li class="last:font-bold">
              <a href={item}>{name}</a>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Breadcrumb;
