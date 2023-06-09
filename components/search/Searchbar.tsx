/**
 * We use a custom route at /s?q= to perform the search. This component
 * redirects the user to /s?q={term} when the user either clicks on the
 * button or submits the form. Make sure this page exists in deco.cx/admin
 * of yout site. If not, create a new page on this route and add the appropriate
 * loader.
 *
 * Note that this is the most performatic way to perform a search, since
 * no JavaScript is shipped to the browser!
 */

import { useEffect, useRef, useState } from "preact/compat";
import Icon from "deco-sites/fashion/components/ui/Icon.tsx";
import Button from "deco-sites/fashion/components/ui/Button.tsx";
import ProductCard from "deco-sites/fashion/components/product/ProductCard.tsx";
import { Slider } from "deco-sites/fashion/components/ui/Slider.tsx";
import { useAutocomplete } from "deco-sites/std/commerce/vtex/hooks/useAutocomplete.ts";
import { useUI } from "deco-sites/fashion/sdk/useUI.ts";
import type { Product, Suggestion } from "deco-sites/std/commerce/types.ts";
import { AnalyticsEvent } from "deco-sites/std/commerce/types.ts";

import SearchTermList from "./SearchTermList.tsx";

declare global {
  interface Window {
    DECO_SITES_STD: {
      sendAnalyticsEvent: (args: AnalyticsEvent) => void;
    };
  }
}

// function CloseButton() {
//   const { displaySearchbar } = useUI();

//   return (
//     <Button
//       class="btn-ghost btn-circle"
//       onClick={() => (displaySearchbar.value = false)}
//     >
//       <Icon id="XMark" width={20} height={20} strokeWidth={2} />
//     </Button>
//   );
// }

// Editable props
export interface EditableProps {
  /**
   * @title Placeholder
   * @description Search bar default placeholder message
   * @default What are you looking for?
   */
  placeholder?: string;
  /**
   * @title Page path
   * @description When user clicks on the search button, navigate it to
   * @default /s
   */
  action?: string;
  /**
   * @title Term name
   * @description Querystring param used when navigating the user
   * @default q
   */
  name?: string;
  /**
   * TODO: Receive querystring from parameter in the server-side
   */
  query?: string;
}

export type Props = EditableProps & {
  /**
   * @title Product suggestions
   * @description Product suggestions displayed on searchs
   */
  products?: Product[] | null;
  suggestions?: Suggestion | null;

  variant?: "desktop" | "mobile";
};

function Searchbar({
  placeholder = "¿Qué estás buscndo?",
  action = "/s",
  name = "q",
  query,
  products,
  suggestions: _suggestions,
  variant = "mobile",
}: Props) {
  const searches = _suggestions?.searches;
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { setSearch, suggestions } = useAutocomplete();

  useEffect(() => {
    if (!searchInputRef.current) {
      return;
    }

    searchInputRef.current.focus();
  }, []);

  const hasSuggestions = !!suggestions.value;
  const emptySuggestions = suggestions.value?.searches?.length === 0;
  const _products = suggestions.value?.products &&
      suggestions.value?.products?.length !== 0
    ? suggestions.value.products
    : products;

  return (
    <div class="flex flex-col p-3 lg:p-0 w-full flex-grow">
      <div class="flex items-center gap-4">
        <form
          id="searchbar"
          action={action}
          class="flex-grow flex gap-3 pl-3 py-1 border border-base-200 rounded-full bg-white h-[35px] items-center"
        >
          <Button
            class="btn-ghost p-0"
            aria-label="Search"
            htmlFor="searchbar"
            tabIndex={-1}
          >
            <Icon
              class="text-base-300"
              id="MagnifyingGlass"
              width={20}
              height={20}
              strokeWidth={0.01}
            />
          </Button>
          <input
            ref={searchInputRef}
            id="search-input"
            class="flex-grow text-sm outline-none placeholder-shown:sibling:hidden"
            name={name}
            defaultValue={query}
            onInput={(e) => {
              const value = e.currentTarget.value;

              if (value) {
                window.DECO_SITES_STD.sendAnalyticsEvent({
                  name: "search",
                  params: { search_term: value },
                });
              }

              setSearch(value);
            }}
            placeholder={placeholder}
            role="combobox"
            aria-controls="search-suggestion"
            autocomplete="off"
          />
          <Button
            type="button"
            aria-label="Clean search"
            height={35}
            class="focus:outline-none min-h-[20px] bg-gray h-[35px] rounded-br-full rounded-tr-full"
            tabIndex={-1}
            onClick={(e) => {
              e.stopPropagation();
              if (searchInputRef.current === null) return;

              searchInputRef.current.value = "";
              setSearch("");
            }}
          >
            <Icon
              class="text-white"
              id="XMark"
              width={20}
              height={20}
              strokeWidth={2}
            />
          </Button>
        </form>
      </div>
      <div class="flex flex-col absolute py-4 px-5 empty:p-0 bg-white w-full right-0 top-[57px] gap-6 divide-y divide-base-200 empty:mt-0 lg:flex-row lg:divide-y-0">
        {searches && searches.length > 0 && !hasSuggestions && (
          <SearchTermList title="Mais buscados" terms={searches} />
        )}
        {hasSuggestions && !emptySuggestions && (
          <SearchTermList
            id="search-suggestion"
            title="Sugestões"
            terms={suggestions.value?.searches ?? []}
          />
        )}
        {hasSuggestions && emptySuggestions && (
          <div class="py-16 lg:py-6! flex flex-col gap-4 w-full">
            <span
              class="font-medium text-xl text-center"
              role="heading"
              aria-level={3}
            >
              Nenhum resultado encontrado
            </span>
            <span class="text-center text-base-300">
              Vamos tentar de outro jeito? Verifique a ortografia ou use um
              termo diferente
            </span>
          </div>
        )}
        {_products && !emptySuggestions && (
          <div class="flex flex-col pt-6 lg:pt-0 gap-6 overflow-x-hidden">
            <span class="font-medium text-xl px-4">Produtos sugeridos</span>
            <Slider>
              {_products.map((
                product,
                index,
              ) => (
                <div
                  class={`${
                    index === 0
                      ? "ml-4"
                      : index === _products.length - 1
                      ? "mr-4"
                      : ""
                  } min-w-[200px] max-w-[200px]`}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </Slider>
          </div>
        )}
      </div>
    </div>
  );
}

export default Searchbar;
