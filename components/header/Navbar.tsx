import HeaderSearchMenu from "deco-sites/fashion/islands/HeaderSearchMenu.tsx";
import HeaderButton from "deco-sites/fashion/islands/HeaderButton.tsx";
import Icon from "deco-sites/fashion/components/ui/Icon.tsx";
import NavItem from "./NavItem.tsx";
import { navbarHeight } from "./constants.ts";
import type { INavItem } from "./NavItem.tsx";
import type { Props as SearchbarProps } from "deco-sites/fashion/components/search/Searchbar.tsx";
import Loading from "deco-sites/fashion/components/ui/Loading.tsx";
import { lazy, Suspense } from "preact/compat";
import Searchbar from "../search/Searchbar.tsx";
import { asset, Head } from "$fresh/runtime.ts";

function Navbar({ items, searchbar }: {
  items: INavItem[];
  searchbar: SearchbarProps;
}) {
  return (
    <>
      {/* Mobile Version */}
      <div class="flex flex-col w-full bg-header md:hidden">
        <div
          style={{ height: navbarHeight }}
          class="md:hidden flex flex-row justify-between items-center border-b border-base-200 w-full pl-2 pr-6 pt-4 gap-2"
        >
          <HeaderButton variant="menu" />

          <a
            href="/"
            class="flex-grow inline-flex items-center justify-center flex-col"
            style={{ minHeight: navbarHeight }}
            aria-label="Store logo"
          >
            <image
              width={165}
              height={25}
              src={asset("/logo-miscelandia.jpg")}
              title="logo mislecandia"
              alt="miscelandia"
            >
              <span class=" text-sm self-end text-white mr-10">Desde 1975</span>
            </image>
          </a>

          <div class="flex gap-1">
            <HeaderButton variant="cart" />
          </div>
        </div>
        <HeaderSearchMenu searchbar={searchbar} />
      </div>

      {/* Desktop Version */}
      <div class="flex flex-col">
        <div class="hidden md:flex flex-row justify-around items-center w-full pl-2 pr-6 py-2 bg-default">
          <div class="w-auto">
            <a
              href="/"
              class="flex-grow inline-flex items-center justify-center flex-col w-64"
              style={{ minHeight: navbarHeight }}
              aria-label="Store logo"
            >
              <image
                width={263}
                height={40}
                src={asset("/logo-miscelandia.jpg")}
                title="logo mislecandia"
                alt="miscelandia"
              >
                <span class=" text-base self-end text-white">Desde 1975</span>
              </image>
            </a>
          </div>
          <HeaderSearchMenu searchbar={searchbar} />
          <div class="flex-none w-44 flex items-center justify-end gap-2">
            <a
              class="btn btn-square btn-ghost text-white"
              href="/login"
              aria-label="Log in"
            >
              <Icon id="UserHappy" width={40} height={40} strokeWidth={0.4} />
            </a>
            <a
              class="btn btn-square btn-ghost text-white"
              href="/wishlist"
              aria-label="Wishlist"
            >
              <Icon
                id="Heart"
                width={40}
                height={40}
                strokeWidth={2}
                fill="none"
              />
            </a>
            <HeaderButton variant="cart" />
          </div>
        </div>
        <div class=" hidden md:flex bg-white">
          <div class="flex-auto flex justify-center">
            {items.map((item) => <NavItem item={item} />)}
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
