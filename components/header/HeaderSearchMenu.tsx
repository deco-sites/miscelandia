import { lazy, Suspense } from "preact/compat";

import { useUI } from "deco-sites/fashion/sdk/useUI.ts";
import Loading from "deco-sites/fashion/components/ui/Loading.tsx";
import { headerHeight } from "deco-sites/fashion/components/header/constants.ts";
import type { Props as SearchbarProps } from "deco-sites/fashion/components/search/Searchbar.tsx";
import Searchbar from "deco-sites/fashion/components/search/Searchbar.tsx";

interface Props {
  searchbar: SearchbarProps;
}

export default function HeaderSearchMenu({ searchbar }: Props) {
  const { displaySearchbar } = useUI();
  const open = window?.matchMedia?.("(min-width: 768px)")?.matches
    ? false
    : true;

  return (
    <div class="w-full flex justify-center max-w-[600px]">
      {open
        ? (
          <div
            class="
             absolute left-0 top-0 w-screen z-50 bg-base-100 border-none bg-header"
            style={open ? { marginTop: "73px" } : { marginTop: headerHeight }}
          >
            {open && (
              <Suspense fallback={<Loading />}>
                <Searchbar {...searchbar} variant="desktop" />
              </Suspense>
            )}
          </div>
        )
        : (
          <div
            class={"block border-y border-base-200 shadow relative left-0 top-0 w-full bg-base-100 border-none px-3 bg-header"}
          >
            <Suspense fallback={<Loading />}>
              <Searchbar {...searchbar} variant="desktop" />
            </Suspense>
          </div>
        )}
    </div>
  );
}
