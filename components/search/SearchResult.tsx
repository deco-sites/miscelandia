import Filters from "deco-sites/fashion/components/search/Filters.tsx";
import Icon from "deco-sites/fashion/components/ui/Icon.tsx";
import SearchControls from "deco-sites/fashion/islands/SearchControls.tsx";
import SendEventOnLoad from "deco-sites/fashion/components/SendEventOnLoad.tsx";
import { mapProductToAnalyticsItem } from "deco-sites/std/commerce/utils/productToAnalyticsItem.ts";
import { useOffer } from "deco-sites/fashion/sdk/useOffer.ts";
import ProductGallery, { Columns } from "../product/ProductGallery.tsx";
import type { LoaderReturnType } from "$live/types.ts";
import type { ProductListingPage } from "deco-sites/std/commerce/types.ts";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import { Picture, Source } from "deco-sites/std/components/Picture.tsx";
import Sort from "deco-sites/fashion/components/search/Sort.tsx";

export interface Banner {
  /** @description RegExp to enable this banner on the current URL. Use /feminino/* to display this banner on feminino category  */
  matcher: string;
  /** @description text to be rendered on top of the image */
  title?: string;
  /** @description text to be rendered on top of the image */
  subtitle?: string;
  image: {
    /** @description Image for big screens */
    desktop: LiveImage;
    /** @description Image for small screens */
    mobile: LiveImage;
    /** @description image alt text */
    alt?: string;
  };
}

export interface Props {
  page: LoaderReturnType<ProductListingPage | null>;
  /**
   * @description Use drawer for mobile like behavior on desktop. Aside for rendering the filters alongside the products
   */
  variant?: "aside" | "drawer";
  /**
   * @description Number of products per line on grid
   */
  columns?: Columns;

  banners?: Banner[];
}

function BannerUI({ banner }: { banner: Banner }) {
  const { title, subtitle, image } = banner;

  return (
    <div class="grid grid-cols-1 grid-rows-1">
      <Picture preload class="col-start-1 col-span-1 row-start-1 row-span-1">
        <Source
          src={image.mobile}
          width={360}
          height={206}
          media="(max-width: 767px)"
        />
        <Source
          src={image.desktop}
          width={931}
          height={171}
          media="(min-width: 767px)"
        />
        <img class="w-full" src={image.desktop} alt={image.alt ?? title} />
      </Picture>
    </div>
  );
}

function Banner({ page, banners = [] }: Props) {
  if (!page || page.breadcrumb.itemListElement.length === 0) {
    return null;
  }

  const { item: canonical } = page
    .breadcrumb
    .itemListElement
    .reduce((curr, acc) => curr.position > acc.position ? curr : acc);

  const matching = banners.find(({ matcher }) =>
    new RegExp(matcher).test(canonical)
  );

  if (!matching) {
    return null;
  }

  return <BannerUI banner={matching} />;
}

function NotFound() {
  return (
    <div class="w-full flex justify-center items-center py-10">
      <span>Not Found!</span>
    </div>
  );
}

function Result({
  page,
  variant,
  banners = [],
}: Omit<Props, "page"> & { page: ProductListingPage }) {
  const { products, filters, breadcrumb, pageInfo, sortOptions } = page;

  return (
    <>
      <div class="w-full px-2 sm:px-8 sm:py-10">
        <SearchControls
          sortOptions={sortOptions}
          filters={filters}
          breadcrumb={breadcrumb}
          displayFilter={variant === "drawer"}
        />

        <div class="flex flex-row">
          <div class="flex flex-col sm:pr-3">
            <div class="text-2xl p-3 hidden sm:flex bg-slate-400 rounded-md text-white">
              <h1>
                {breadcrumb
                  ?.itemListElement[breadcrumb?.itemListElement.length - 1]
                  .name}
                {console.log("breadcrumb", breadcrumb)}
              </h1>
            </div>
            {variant === "aside" && filters.length > 0 && (
              <aside class="hidden sm:block w-min min-w-[255px] mt-5">
                <p class="text-sm">FILTRADO POR:</p>
                <Filters filters={filters} />
              </aside>
            )}
          </div>

          <div class="flex-grow">
            <div class="w-full justify-end flex py-3 items-center sm:order-2">
              {sortOptions.length > 0 && <Sort sortOptions={sortOptions} />}
            </div>
            <div class=" w-full sm:order-1 mb-3 sm:m-0">
              <Banner page={page} banners={banners} />
            </div>
            <div class="text-2xl p-3 mx-3 sm:hidden bg-slate-400 rounded-md text-white">
              <h1>
                {breadcrumb
                  ?.itemListElement[breadcrumb?.itemListElement.length - 1]
                  .name}
                {console.log("breadcrumb", breadcrumb)}
              </h1>
            </div>

            <ProductGallery products={products} />
          </div>
        </div>

        <div class="flex justify-center my-4">
          <div class="btn-group">
            <a
              aria-label="previous page link"
              rel="prev"
              href={pageInfo.previousPage ?? "#"}
              class="btn btn-ghost"
            >
              <Icon id="ChevronLeft" width={20} height={20} strokeWidth={2} />
            </a>
            <span class="btn btn-ghost">
              Page {pageInfo.currentPage + 1}
            </span>
            <a
              aria-label="next page link"
              rel="next"
              href={pageInfo.nextPage ?? "#"}
              class="btn btn-ghost"
            >
              <Icon
                id="ChevronRight"
                width={20}
                height={20}
                strokeWidth={2}
              />
            </a>
          </div>
        </div>
      </div>
      <SendEventOnLoad
        event={{
          name: "view_item_list",
          params: {
            // TODO: get category name from search or cms setting
            item_list_name: "",
            item_list_id: "",
            items: page.products?.map((product) =>
              mapProductToAnalyticsItem({
                ...(useOffer(product.offers)),
                product,
                breadcrumbList: page.breadcrumb,
              })
            ),
          },
        }}
      />
    </>
  );
}

function SearchResult({ page, ...props }: Props) {
  if (!page) {
    return <NotFound />;
  }

  return <Result {...props} page={page} />;
}

export default SearchResult;
