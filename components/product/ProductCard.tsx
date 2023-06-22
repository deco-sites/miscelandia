import { Picture, Source } from "deco-sites/std/components/Picture.tsx";
import Avatar from "deco-sites/fashion/components/ui/Avatar.tsx";
import WishlistIcon from "deco-sites/fashion/islands/WishlistButton.tsx";
import { useOffer } from "deco-sites/fashion/sdk/useOffer.ts";
import { formatPrice } from "deco-sites/fashion/sdk/format.ts";
import { useVariantPossibilities } from "deco-sites/fashion/sdk/useVariantPossiblities.ts";
import { mapProductToAnalyticsItem } from "deco-sites/std/commerce/utils/productToAnalyticsItem.ts";
import { sendEventOnClick } from "deco-sites/fashion/sdk/analytics.ts";
import type { Product } from "deco-sites/std/commerce/types.ts";
import AddToCartButton from "./AddToCartButton.tsx";
import Off from "./Off.tsx";

interface Props {
  product: Product;
  /** Preload card image */
  preload?: boolean;

  /** @description used for analytics event */
  itemListName?: string;
}

function ProductCard({ product, preload, itemListName }: Props) {
  const {
    url,
    productID,
    name,
    image: images,
    offers,
    isVariantOf,
    brand,
  } = product;
  const productGroupID = isVariantOf?.productGroupID;
  const [front, back] = images ?? [];
  const { listPrice, price, seller } = useOffer(offers);
  const possibilities = useVariantPossibilities(product);
  const options = Object.entries(
    possibilities["TAMANHO"] ?? possibilities["Tamanho"] ?? {},
  );
  const clickEvent = {
    name: "select_item" as const,
    params: {
      item_list_name: itemListName,
      items: [
        mapProductToAnalyticsItem({
          product,
          price,
          listPrice,
        }),
      ],
    },
  };

  return (
    <div
      class="border-[1px] border-slate-300 h-full flex flex-col justify-between  bg-white hover:shadow-2xl p-2 rounded-[5px]"
      data-deco="view-product"
      id={`product-card-${productID}`}
      {...sendEventOnClick(clickEvent)}
    >
      <figure class="relative">
        <div class="absolute top-0 right-0 text-default w-full flex justify-end">
          <Off product={product} />
        </div>
        <a href={url} aria-label="view product">
          <Picture>
            <Source
              src={front.url!}
              alt={front.alternateName}
              width={100}
              height={100}
              media="(max-width: 767px)"
            />
            <Source
              src={front.url!}
              alt={front.alternateName}
              width={200}
              height={200}
              media="(min-width: 767px)"
            />
            <img
              class="rounded w-full"
              src={front.url!}
              alt={front.alternateName}
              decoding="auto"
              loading="lazy"
            />
          </Picture>
        </a>
        <figcaption class="glass card-body card-actions absolute bottom-0 left-0 w-full invisible group-hover:visible">
          <ul class="flex justify-center items-center gap-2 w-full">
            {options.map(([value, [link]]) => (
              <a href={link}>
                <Avatar
                  variant={link === url ? "active" : "default"}
                  content={value}
                />
              </a>
            ))}
          </ul>
        </figcaption>
      </figure>
      <div class="card-body p-1 flex flex-col gap-5">
        <div class="flex flex-col gap-[10px] items-center">
          <h2 class="text-xs sm:text-base font-firaSans uppercase text-center text-text-color-secord overflow-hidden">
            {name}
          </h2>
          <span class="text-sm text-gray-400 font-firaSans">
            {brand}
          </span>
        </div>
        <div class="flex flex-col items-center gap-[10px]">
          {
            /* <span class="text-base-300 text-[10px] text-xs text-center">
            {offers!.offers[0]?.priceSpecification[8]?.description}
          </span> */
          }
          <div class="flex flex-wrap gap-[10px] items-center">
            <span class="font-firaSans text-text-color-third sm:text-lg">
              {formatPrice(price, offers!.priceCurrency!)}
            </span>
            {listPrice != price && (
              <span class="font-firaSans text-text-color-secord text-sm sm:text-base line-through">
                {formatPrice(listPrice, offers!.priceCurrency!)}
              </span>
            )}
          </div>
          <div class="flex items-center max-h-[35px] justify-around w-full">
            <div class="max-h-[35px] overflow-hidden flex items-center rounded-full justify-center">
              <AddToCartButton
                skuId={productID}
                sellerId={seller ? seller : "1"}
                price={price ?? 0}
                discount={price && listPrice ? listPrice - price : 0}
                name={product.name ?? ""}
                productGroupId={product.isVariantOf?.productGroupID ?? ""}
              />
            </div>
            <a
              class="rounded-full border border-text-color-secord px-[15px] flex flex-col items-center font-medium"
              href={url}
            >
              <p class="text-center leading-4">Ver</p>
              <p class="text-center leading-4">+</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
