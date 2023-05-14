import { useId } from "preact/hooks";
import AddToCartButton from "deco-sites/fashion/islands/AddToCartButton.tsx";
import ShippingSimulation from "deco-sites/fashion/islands/ShippingSimulation.tsx";
import Breadcrumb from "deco-sites/fashion/components/ui/Breadcrumb.tsx";
import Button from "deco-sites/fashion/components/ui/Button.tsx";
import Icon from "deco-sites/fashion/components/ui/Icon.tsx";
import Image from "deco-sites/std/components/Image.tsx";
import {
  Slider,
  SliderDots,
} from "deco-sites/fashion/components/ui/Slider.tsx";
import SliderJS from "deco-sites/fashion/components/ui/SliderJS.tsx";
import { useOffer } from "deco-sites/fashion/sdk/useOffer.ts";
import { formatPrice } from "deco-sites/fashion/sdk/format.ts";
import type { LoaderReturnType } from "$live/types.ts";
import type { ProductDetailsPage } from "deco-sites/std/commerce/types.ts";
import SendEventOnLoad from "deco-sites/fashion/components/SendEventOnLoad.tsx";
import { mapProductToAnalyticsItem } from "deco-sites/std/commerce/utils/productToAnalyticsItem.ts";

import ProductSelector from "./ProductVariantSelector.tsx";
import ProductImageZoom from "deco-sites/fashion/islands/ProductImageZoom.tsx";
import WishlistButton from "../wishlist/WishlistButton.tsx";

import { asset } from "$fresh/runtime.ts";

export type Variant = "front-back" | "slider" | "auto";

export type Infos = {
  whatsapp: string;
  tel: string;
  service: string;
  comparte: {
    facebooke: string;
    google: string;
    twitter: string;
    pinterwst: string;
  };
};

export interface Props {
  page: LoaderReturnType<ProductDetailsPage | null>;
  /**
   * @title Product view
   * @description Ask for the developer to remove this option since this is here to help development only and should not be used in production
   */
  variant?: Variant;

  infos?: Infos;
}

const WIDTH = 360;
const HEIGHT = 360;
const ASPECT_RATIO = `${WIDTH} / ${HEIGHT}`;

/**
 * Rendered when a not found is returned by any of the loaders run on this page
 */
function NotFound() {
  return (
    <div class="w-full flex justify-center items-center py-28">
      <div class="flex flex-col items-center justify-center gap-6">
        <span class="font-medium text-2xl">Página não encontrada</span>
        <a href="/">
          <Button>Voltar à página inicial</Button>
        </a>
      </div>
    </div>
  );
}

function BreadcrumbList({ page }: { page: ProductDetailsPage }) {
  const {
    breadcrumbList,
  } = page;

  return (
    <div class="flex px-3 py-2 sm:px-9">
      {/* Breadcrumb */}
      <Breadcrumb
        itemListElement={breadcrumbList?.itemListElement.slice(0, -1)}
      />
    </div>
  );
}

function Brand({ page }: { page: ProductDetailsPage }) {
  const { product } = page;

  return (
    <>
      <h2 class="uppercase text-text-color-secord text-sm font-semibold font-firaSans">
        <span>Marca:</span>
        <span>{product?.brand}</span>
      </h2>
    </>
  );
}

function Name({ page }: { page: ProductDetailsPage }) {
  const { product } = page;
  const { name } = product;

  return (
    <>
      <h1 class="text-xl font-firaSans uppercase">
        {name}
      </h1>
    </>
  );
}

function Ref({ page }: { page: ProductDetailsPage }) {
  const { product } = page;
  const { gtin } = product;

  return (
    <>
      <p class="text-[#999] text-sm sm:mt-4">
        <span>Ref:</span>
        <span>{gtin}</span>
      </p>
    </>
  );
}

function Price({ page }: { page: ProductDetailsPage }) {
  const { product } = page;
  const { offers } = product;
  const { price, listPrice } = useOffer(offers);

  return (
    <>
      <div class="flex flex-row sm:flex-col py-3 justify-center">
        <div class="w-full">
          <span class="text-center text-default text-2xl font-firaSans">
            {formatPrice(price, offers!.priceCurrency!)}
          </span>
        </div>
        <div class="w-full">
          <span class="text-lg font-firaSans line-through text-[#666]">
            {formatPrice(listPrice, offers!.priceCurrency!)}
          </span>
        </div>
      </div>
    </>
  );
}

function ProductVariant({ page }: { page: ProductDetailsPage }) {
  const { product } = page;

  return (
    <>
      <ProductSelector product={product} />
    </>
  );
}

function Buttons({ page }: { page: ProductDetailsPage }) {
  const { product } = page;
  const { offers, productID, isVariantOf } = product;
  const { seller, price, listPrice } = useOffer(offers);

  return (
    <>
      {/* Add to Cart and Favorites button */}
      <div class="mt-4 sm:mt-10 flex flex-col gap-2">
        {seller && (
          <AddToCartButton
            skuId={productID}
            sellerId={seller}
            price={price ?? 0}
            discount={price && listPrice ? listPrice - price : 0}
            name={product.name ?? ""}
            productGroupId={product.isVariantOf?.productGroupID ?? ""}
          />
        )}
        <WishlistButton
          variant="full"
          productGroupID={isVariantOf?.productGroupID}
          productID={productID}
        />
      </div>
    </>
  );
}

function Description({ page }: { page: ProductDetailsPage }) {
  const { product } = page;
  const { description } = product;

  return (
    <>
      <div class="mt-4">
        <p class="text-lg font-Lato text-text-color-secord">
          Descripción del producto
        </p>
        <p class="text-sm text-text-color-secord ">{description}</p>
      </div>
    </>
  );
}

function ProductInfo({ page }: { page: ProductDetailsPage }) {
  const {
    breadcrumbList,
    product,
  } = page;
  const {
    description,
    productID,
    offers,
    name,
    gtin,
    isVariantOf,
  } = product;
  const { price, listPrice, seller, installments } = useOffer(offers);

  return (
    <>
      {/* Breadcrumb */}
      <Breadcrumb
        itemListElement={breadcrumbList?.itemListElement.slice(0, -1)}
      />
      {/* Code and name */}
      <div class="mt-4 sm:mt-8">
        <div>
          <span class="text-sm text-base-300">
            Cod. {gtin}
          </span>
        </div>
        <h1>
          <span class="font-medium text-xl">{name}</span>
        </h1>
      </div>
      {/* Prices */}
      <div class="mt-4">
        <div class="flex flex-row gap-2 items-center">
          <span class="line-through text-base-300 text-xs">
            {formatPrice(listPrice, offers!.priceCurrency!)}
          </span>
          <span class="font-medium text-xl text-secondary">
            {formatPrice(price, offers!.priceCurrency!)}
          </span>
        </div>
        <span class="text-sm text-base-300">
          {installments}
        </span>
      </div>
      {/* Sku Selector */}
      <div class="mt-4 sm:mt-6">
        <ProductSelector product={product} />
      </div>
      {/* Add to Cart and Favorites button */}
      <div class="mt-4 sm:mt-10 flex flex-col gap-2">
        {seller && (
          <AddToCartButton
            skuId={productID}
            sellerId={seller}
            price={price ?? 0}
            discount={price && listPrice ? listPrice - price : 0}
            name={product.name ?? ""}
            productGroupId={product.isVariantOf?.productGroupID ?? ""}
          />
        )}
        <WishlistButton
          variant="full"
          productGroupID={isVariantOf?.productGroupID}
          productID={productID}
        />
      </div>
      {/* Shipping Simulation */}
      <div class="mt-8">
        <ShippingSimulation
          items={[{
            id: Number(product.sku),
            quantity: 1,
            seller: seller ?? "1",
          }]}
        />
      </div>
      {/* Description card */}
      <div class="mt-4 sm:mt-6">
        <span class="text-sm">
          {description && (
            <details>
              <summary class="cursor-pointer">Descrição</summary>
              <div class="ml-2 mt-2">{description}</div>
            </details>
          )}
        </span>
      </div>
      <SendEventOnLoad
        event={{
          name: "view_item",
          params: {
            items: [
              mapProductToAnalyticsItem({
                product,
                breadcrumbList,
                price,
                listPrice,
              }),
            ],
          },
        }}
      />
    </>
  );
}

function Details({
  page,
  variant,
  infos,
}: { page: ProductDetailsPage; variant: Variant; infos?: Infos }) {
  const id = `product-image-gallery:${useId()}`;
  const { product: { image: images = [] } } = page;

  /**
   * Product slider variant
   *
   * Creates a three columned grid on destkop, one for the dots preview, one for the image slider and the other for product info
   * On mobile, there's one single column with 3 rows. Note that the orders are different from desktop to mobile, that's why
   * we rearrange each cell with col-start- directives
   */
  if (variant === "slider") {
    return (
      <>
        <BreadcrumbList page={page} />
        <div
          id={id}
          class={`container grid grid-cols-1 gap-4 sm:grid-cols-[auto_360px] sm:grid-rows-[auto] sm:justify-center sm:max-h-[calc(${
            (HEIGHT / WIDTH).toFixed(2)
          }*40vw)]`}
        >
          <div class="text-center sm:col-span-2 sm:row-span-1 px-3 sm:row-start-1 sm:flex sm:justify-start sm:text-start sm:flex-col">
            <Brand page={page} />

            <Name page={page} />

            <Ref page={page} />
          </div>

          {/* Image Slider */}
          <div class="relative sm:col-span-1 sm:row-start-1 sm:col-end-2 sm:row-end-3 max-w-[556px]">
            <Slider class="gap-6">
              {images.map((img, index) => (
                <Image
                  class="snap-center min-w-[100vw] sm:min-w-[28vw]"
                  sizes="(max-width: 556px) 100vw, 40vw"
                  style={{ aspectRatio: ASPECT_RATIO }}
                  src={img.url!}
                  alt={img.alternateName}
                  width={WIDTH}
                  height={HEIGHT}
                  // Preload LCP image for better web vitals
                  preload={index === 0}
                  loading={index === 0 ? "eager" : "lazy"}
                />
              ))}
            </Slider>

            {images.length > 1
              ? (
                <>
                  <Button
                    class="absolute left-2 top-1/2 btn-circle btn-outline"
                    data-slide="prev"
                    aria-label="Previous"
                  >
                    <Icon size={20} id="ChevronLeft" strokeWidth={3} />
                  </Button>

                  <Button
                    class="absolute right-2 top-1/2 btn-circle btn-outline"
                    data-slide="next"
                    aria-label="Next"
                  >
                    <Icon size={20} id="ChevronRight" strokeWidth={3} />
                  </Button>

                  <div class="absolute top-2 right-2 bg-base-100 rounded-full">
                    <ProductImageZoom
                      images={images}
                      width={1280}
                      height={1280 * HEIGHT / WIDTH}
                    />
                  </div>
                </>
              )
              : ("")}
          </div>
          {images.length > 1
            ? (
              <>
                {/* Dots */}
                <SliderDots class="gap-2 sm:justify-start overflow-auto px-4 sm:px-0 flex-col sm:col-start-1 sm:col-span-1 sm:row-start-1">
                  {images.map((img, _) => (
                    <Image
                      style={{ aspectRatio: ASPECT_RATIO }}
                      class="group-disabled:border-base-300 border rounded min-w-[63px] sm:min-w-[100px]"
                      width={63}
                      height={87.5}
                      src={img.url!}
                      alt={img.alternateName}
                    />
                  ))}
                </SliderDots>
              </>
            )
            : ("")}

          <div class="p-2 sm:col-span-1 sm:row-span-2 sm:row-start-2">
            <Price page={page} />

            <ProductVariant page={page} />

            <Buttons page={page} />

            <Description page={page} />

            {/* Meios de pagamento */}
            <div class="flex justify-center sm:mt-2">
              <img
                src={asset("/buy-pdp.webp")}
                alt="meios de pagamento"
                title="meios de pagmaneto"
                width={320}
                height={100}
              >
              </img>
            </div>

            {/* Compra por telefone */}
            <div class="border-t border-[#666] py-3">
              <p class="text-default mb-4">Nuevo! compra por teléfono!</p>
              <div class="flex gap-2">
                <Icon id="WhatsApp" width={15} height={15}></Icon>
                <span class="text-sm">{infos?.whatsapp}</span>
              </div>
              <div class="flex gap-2">
                <Icon id="Phone" width={15} height={15}></Icon>
                <span class="text-sm">{infos?.tel}</span>
              </div>
              <p class="text-xs mt-3">{infos?.service}</p>
            </div>

            {/* Compartilhar */}
            <div class="w-full flex justify-center gap-3 flex-col items-center border-t border-[#666] p-3">
              <p>Comparter</p>
              <div class="flex flex-row gap-3">
                <a href={infos?.comparte.facebooke}>
                  <Icon id="Facebook" width={25} height={25}></Icon>
                </a>

                <a href={infos?.comparte.google}>
                  <Icon id="Facebook" width={25} height={25}></Icon>
                </a>
                <a href={infos?.comparte.twitter}>
                  <Icon id="Tiktok" width={25} height={25}></Icon>
                </a>
                <a href={infos?.comparte.pinterwst}>
                  <Icon id="Instagram" width={25} height={25}></Icon>
                </a>
              </div>
            </div>
          </div>
        </div>

        <SliderJS rootId={id}></SliderJS>
      </>
    );
  }

  /**
   * Product front-back variant.
   *
   * Renders two images side by side both on mobile and on desktop. On mobile, the overflow is
   * reached causing a scrollbar to be rendered.
   */
  return (
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-[50vw_25vw] sm:grid-rows-1 sm:justify-center">
      {/* Image slider */}
      <Slider class="gap-6">
        {[images[0], images[1] ?? images[0]].map((img, index) => (
          <Image
            class="snap-center min-w-[100vw] sm:min-w-[24vw]"
            sizes="(max-width: 640px) 100vw, 24vw"
            style={{ aspectRatio: ASPECT_RATIO }}
            src={img.url!}
            alt={img.alternateName}
            width={WIDTH}
            height={HEIGHT}
            // Preload LCP image for better web vitals
            preload={index === 0}
            loading={index === 0 ? "eager" : "lazy"}
          />
        ))}
      </Slider>

      {/* Product Info */}
      <div class="px-4 sm:pr-0 sm:pl-6">
        <ProductInfo page={page} />
      </div>
    </div>
  );
}

function ProductDetails(
  { page, variant: maybeVar = "auto", infos }: Props,
) {
  /**
   * Showcase the different product views we have on this template. In case there are less
   * than two images, render a front-back, otherwhise render a slider
   * Remove one of them and go with the best suited for your use case.
   */
  const variant = maybeVar === "auto"
    ? page?.product.image?.length && page?.product.image?.length < 2
      ? "front-back"
      : "slider"
    : maybeVar;

  return (
    <div class="py-0 sm:py-10">
      {page
        ? <Details page={page} variant={variant} infos={infos} />
        : <NotFound />}
    </div>
  );
}

export default ProductDetails;
