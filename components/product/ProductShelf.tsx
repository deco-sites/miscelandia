import ProductCard from "deco-sites/fashion/components/product/ProductCard.tsx";
import {
  Slider,
  SliderDots,
} from "deco-sites/fashion/components/ui/Slider.tsx";
import SliderControllerJS from "deco-sites/fashion/islands/SliderJS.tsx";
import Button from "deco-sites/fashion/components/ui/Button.tsx";
import Icon from "deco-sites/fashion/components/ui/Icon.tsx";
import { useId } from "preact/hooks";
import SendEventOnLoad from "deco-sites/fashion/components/SendEventOnLoad.tsx";
import { mapProductToAnalyticsItem } from "deco-sites/std/commerce/utils/productToAnalyticsItem.ts";
import { useOffer } from "deco-sites/fashion/sdk/useOffer.ts";
import type { LoaderReturnType } from "$live/types.ts";
import type { Product } from "deco-sites/std/commerce/types.ts";

export interface Props {
  title: string;
  products: LoaderReturnType<Product[] | null>;
  itemsPerPage?: number;
}

function ProductShelf({
  title,
  products,
}: Props) {
  const id = useId();

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div
      id={id}
      class="container sm:max-w-[1700px] grid grid-cols-[70px_1fr_70px] grid-rows-[48px_1fr_48px_1fr] pb-10 pt-6 px-0 sm:px-5"
    >
      <h2 class="text-center lg:text-left row-start-1 col-span-full text-text-color-secord ">
        <span class="font-firaSans font-semibold text-lg uppercase tracking-widest lg:ml-4">
          {title}
        </span>
      </h2>

      <Slider
        class="gap-2 sm:gap-6 col-span-full row-start-2 row-end-5 pb-3 px-3 overflow-auto sm:overflow-x-hidden"
        snap="snap-center sm:snap-start block sm:first:ml-6 sm:first:ml-0 sm:last:mr-6 sm:last:mr-0"
      >
        {products?.map((product) => (
          <div class="min-w-[170px] max-w-[170px] sm:min-w-[300px] sm:w-full sm:max-w-[445px] lg:min-w-[390px]">
            <ProductCard product={product} itemListName={title} />
          </div>
        ))}
      </Slider>

      <>
        <div class="hidden relative sm:block z-10 col-start-1 row-start-3">
          <Button
            class="btn-circle btn-outline absolute right-1/2 bg-base-100"
            data-slide="prev"
            aria-label="Previous item"
          >
            <Icon size={20} id="ChevronLeft" strokeWidth={3} />
          </Button>
        </div>
        <div class="hidden relative sm:block z-10 col-start-3 row-start-3">
          <Button
            class="btn-circle btn-outline absolute left-1/2 bg-base-100"
            data-slide="next"
            aria-label="Next item"
          >
            <Icon size={20} id="ChevronRight" strokeWidth={3} />
          </Button>
        </div>
      </>
      <SliderControllerJS rootId={id} />
      <SendEventOnLoad
        event={{
          name: "view_item_list",
          params: {
            item_list_name: title,
            items: products.map((product) =>
              mapProductToAnalyticsItem({
                product,
                ...(useOffer(product.offers)),
              })
            ),
          },
        }}
      />
    </div>
  );
}

export default ProductShelf;
