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
  const shouldRender = self?.location;
  return (
    <div
      class={"w-full lg:w-1/2"}
    >
      {shouldRender && (
        <Suspense fallback={<div />}>
          <Searchbar {...searchbar} />
        </Suspense>
      )}
    </div>
  );
}
