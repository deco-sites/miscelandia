import HeaderSearchMenu from "deco-sites/fashion/islands/HeaderSearchMenu.tsx";
import HeaderButton from "deco-sites/fashion/islands/HeaderButton.tsx";
import Icon from "deco-sites/fashion/components/ui/Icon.tsx";
import NavItem from "./NavItem.tsx";
import { navbarHeight } from "./constants.ts";
import type { INavItem } from "./NavItem.tsx";
import type { Props as SearchbarProps } from "deco-sites/fashion/components/search/Searchbar.tsx";
import { asset } from "$fresh/runtime.ts";

function Navbar({ items, searchbar }: {
  items: INavItem[];
  searchbar: SearchbarProps;
}) {
  return (
    <>
      {/* Mobile Version */}
      <div class="flex flex-col w-full bg-header lg:hidden">
        <div
          style={{ height: navbarHeight }}
          class="lg:hidden flex flex-row justify-between items-center w-full pl-2 pr-2 lg:pr-6 pt-4 gap-2"
        >
          <HeaderButton variant="menu" />

          <div>
            <a
              href="/"
              class="flex-grow inline-flex items-center justify-center flex-col"
              style={{ minHeight: navbarHeight }}
              aria-label="Store logo"
            >
              <div class="flex flex-col items-end">
                <div class="text-white after:content-['\e900'] after:block  after:!font-Icon after:text-[22px] after:font-thin" />
                <p class="text-[14px] leading-[10px] pr-[10px] text-white">
                  Desde 1945
                </p>
              </div>
            </a>
          </div>
          <div class="flex gap-1">
            <HeaderButton variant="cart" />
          </div>
        </div>
        <HeaderSearchMenu searchbar={searchbar} />
      </div>

      {/* Desktop Version */}
      <div class="flex flex-col">
        <div class="hidden lg:flex flex-row justify-between items-center w-full px-[40px] py-2 bg-default gap-2">
          <div class="w-auto">
            <a
              href="/"
              class="flex-grow inline-flex items-center justify-center flex-col w-64"
              style={{ minHeight: navbarHeight }}
              aria-label="Store logo"
            >
              <div class="flex flex-col items-end">
                <div class="text-white after:content-['\e900'] after:block  after:!font-Icon after:text-[35px] after:font-thin" />
                <p class="text-[20px] leading-[10px] pr-[10px] text-white">
                  Desde 1945
                </p>
              </div>
            </a>
          </div>
          <HeaderSearchMenu searchbar={searchbar} />
          <div class="flex-none flex items-center justify-end gap-2">
            <a
              class="btn btn-square btn-ghost text-white after:content-['\e915'] after:block  after:!font-Icon after:text-[30px] after:font-thin"
              href="/login"
              aria-label="Log in"
            >
            </a>
            <HeaderButton variant="cart" />
          </div>
        </div>
        <div class=" hidden lg:flex bg-white drop-shadow-lg">
          <div class="flex-auto flex justify-center">
            {items.map((item) => <NavItem item={item} />)}
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
