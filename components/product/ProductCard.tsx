import Image from "deco-sites/std/components/Image.tsx";
import Avatar from "deco-sites/fashion/components/ui/Avatar.tsx";
import WishlistIcon from "deco-sites/fashion/islands/WishlistButton.tsx";
import { useOffer } from "deco-sites/fashion/sdk/useOffer.ts";
import { formatPrice } from "deco-sites/fashion/sdk/format.ts";
import { useVariantPossibilities } from "deco-sites/fashion/sdk/useVariantPossiblities.ts";
import { mapProductToAnalyticsItem } from "deco-sites/std/commerce/utils/productToAnalyticsItem.ts";
import { sendEventOnClick } from "deco-sites/fashion/sdk/analytics.ts";
import type { Product } from "deco-sites/std/commerce/types.ts";
import AddToCartButton from "./AddToCartButton.tsx";

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
      class="border-[1px] border-slate-300 bg-white hover:shadow-2xl p-2"
      data-deco="view-product"
      id={`product-card-${productID}`}
      {...sendEventOnClick(clickEvent)}
    >
      <figure class="relative">
        <div class="absolute top-0 right-0">
          <WishlistIcon productGroupID={productGroupID} productID={productID} />
        </div>
        <a href={url} aria-label="view product">
          <Image
            src={front.url!}
            alt={front.alternateName}
            width={251}
            height={251}
            class="rounded w-full"
            preload={preload}
            loading={preload ? "eager" : "lazy"}
            sizes="(max-width: 640px) 50vw, 20vw"
          />
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
      <div class="card-body p-1">
        <h2 class="text-xs sm:text-base font-firaSans uppercase text-center text-text-color-secord overflow-hidden">
          {name}
        </h2>
        <div class="flex flex-col items-center gap-2">
          <span class="text-base-300 text-[10px] text-xs text-center">
            {offers!.offers[0]?.priceSpecification[8]?.description}
          </span>
          <span class="text-sm font-semibold">
            Marca: {brand}
          </span>
          <span class="font-firaSans font-bold text-black sm:text-lg">
            {formatPrice(price, offers!.priceCurrency!)}
          </span>
        </div>
        <AddToCartButton
          skuId={productID}
          sellerId={seller ? seller : "1"}
          price={price ?? 0}
          discount={price && listPrice ? listPrice - price : 0}
          name={product.name ?? ""}
          productGroupId={product.isVariantOf?.productGroupID ?? ""}
        />
      </div>
    </div>
  );
}

export default ProductCard;
