import { useId } from "preact/hooks";
import AddToCartButton from "deco-sites/fashion/islands/AddToCartButton.tsx";
import ShippingSimulation from "deco-sites/fashion/islands/ShippingSimulation.tsx";
import Breadcrumb from "deco-sites/fashion/components/ui/Breadcrumb.tsx";
import Button from "deco-sites/fashion/components/ui/Button.tsx";
import Icon from "deco-sites/fashion/components/ui/Icon.tsx";
import Image from "deco-sites/std/components/Image.tsx";
import { useVariantPossibilities } from "deco-sites/fashion/sdk/useVariantPossiblities.ts";
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
import QuantityAddToCartButton from "./QuantityAddToCartButton.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import ProductSize from "deco-sites/miscelandia/components/product/ProductSizes.tsx";

import Off from "./Off.tsx";

import { asset } from "$fresh/runtime.ts";

export type Link = {
  label: string;
  href: string;
};
export type Infos = {
  whatsapp: Link;
  tel: Link;
  service: string;
  sizesImage: LiveImage;
  comparte: {
    facebook: string;
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
  infos: Infos;
}

const WIDTH = 500;
const HEIGHT = 500;
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
      <p class="text-lg text-text-color-secord font-firaSans">
        Precio:
      </p>
      <div class="flex flex-row sm:flex-col py-3 justify-center">
        <div class="w-full">
          <span class="text-center text-default text-2xl font-firaSans">
            {formatPrice(price, offers!.priceCurrency!)}
          </span>
        </div>
        {listPrice != price &&
          (
            <div class="w-full">
              <span class="text-lg font-firaSans line-through text-[#666]">
                {formatPrice(listPrice, offers!.priceCurrency!)}
              </span>
            </div>
          )}
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

function Buttons(
  { page, sizesImage }: { page: ProductDetailsPage; sizesImage: LiveImage },
) {
  const { product } = page;
  const { offers, productID, isVariantOf } = product;
  const { seller, price, listPrice } = useOffer(offers);
  const possibilities = useVariantPossibilities(product);

  return (
    <>
      <div class="mt-4">
        {/* Add to Cart and Favorites button */}
        {seller && (
          <QuantityAddToCartButton
            skuId={productID}
            sellerId={seller}
            price={price ?? 0}
            discount={price && listPrice ? listPrice - price : 0}
            name={product.name ?? ""}
            productGroupId={product.isVariantOf?.productGroupID ?? ""}
          />
        )}
        {possibilities["TALLA"] && <ProductSize image={sizesImage} />}
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

function Details({
  page,
  infos,
}: { page: ProductDetailsPage; infos: Infos }) {
  const id = `product-image-gallery:${useId()}`;
  const { product: { image: images = [] } } = page;
  const certifications = page.product.isVariantOf?.additionalProperty.filter(
    (item) => item.name === "CERTIFICACIONES",
  );
  const otherEspecifications = page.product.isVariantOf?.additionalProperty
    .filter(
      (item) => item.name !== "CERTIFICACIONES",
    );
  const especifications = otherEspecifications?.map((item) => {
    return { name: item.name, value: item.value };
  });
  if (certifications?.length) {
    especifications?.push({
      name: "CERTIFICACIONES",
      value: certifications.map((item) => item.value).join(", "),
    });
  }
  return (
    <>
      <BreadcrumbList page={page} />
      <div
        id={id}
        class={`container max-w-[1200px] grid grid-cols-1 gap-4 sm:grid-cols-[60vw_auto]  sm:grid-rows-[auto] sm:justify-center sm:max-h-[calc(${
          (HEIGHT / WIDTH).toFixed(2)
        }*40vw)]`}
      >
        <div class="text-center sm:col-span-2 sm:row-span-1 px-3 sm:row-start-1 sm:flex sm:justify-start sm:text-start sm:flex-col">
          <Brand page={page} />

          <Name page={page} />

          <Ref page={page} />
        </div>

        {/* Image Slider */}
        <div class="container relative sm:col-start-1 sm:col-end-3 sm:row-start-1 grid-cols-1  sm:row-end-3 grid  sm:grid-cols-[100px_minmax(200px,_1fr)] lg:grid-rows-1">
          <div class="relative col-start-2 h-min">
            <Slider
              class={"gap-6 scrollbar-none max-w-[100vw] items-end"}
              style={`grid-template-columns: repeat(${images.length}, 100%) `}
            >
              {images.map((img, index) => (
                <Image
                  class="snap-center min-w-[100vw] sm:min-w-[50vw] sm:w-full max-w-[556px]"
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
            <div class="absolute top-2 right-2">
              <Off product={page?.product} />
            </div>
            <div>
              {images.length > 1
                ? (
                  <>
                    <Button
                      class="absolute left-2 top-1/2 text-default bg-transparent border-none hover:bg-transparent hover:border-none"
                      data-slide="prev"
                      aria-label="Previous"
                    >
                      <Icon size={30} id="ChevronLeft" strokeWidth={3} />
                    </Button>

                    <Button
                      class="absolute right-2 top-1/2 text-default bg-transparent border-none hover:bg-transparent hover:border-none"
                      data-slide="next"
                      aria-label="Next"
                    >
                      <Icon size={30} id="ChevronRight" strokeWidth={3} />
                    </Button>
                  </>
                )
                : ("")}
            </div>
          </div>

          {images.length > 1
            ? (
              <>
                {/* Dots */}
                <SliderDots class="hidden sm:block gap-2 sm:justify-start overflow-auto px-4 sm:px-0 flex-col col-start-1 col-span-1 row-start-1 scrollbar-none">
                  {images.map((img, _) => (
                    <Image
                      style={{ aspectRatio: ASPECT_RATIO }}
                      class="rounded min-w-[63px]"
                      width={63}
                      height={87.5}
                      src={img.url!}
                      alt={img.alternateName}
                      loading="lazy"
                      decoding="async"
                    />
                  ))}
                </SliderDots>
              </>
            )
            : ("")}
        </div>

        <div class="p-2 sm:col-start-3 sm:col-end-4  sm:row-start-2">
          <Price page={page} />

          <ProductVariant page={page} />

          <Buttons page={page} sizesImage={infos?.sizesImage} />

          <Description page={page} />

          {/* Meios de pagamento */}
          <div class="flex justify-center sm:mt-2">
            <img
              src={asset("/buy-pdp.webp")}
              alt="meios de pagamento"
              title="meios de pagmaneto"
              width={320}
              height={100}
              loading="lazy"
              decoding="async"
            >
            </img>
          </div>

          {/* Compra por telefone */}
          <div class="border-t border-[#666] py-3 text-[#666]">
            <p class="text-default mb-4">Nuevo! compra por teléfono!</p>
            <a href={infos?.whatsapp.href} class="flex gap-2">
              <div class="after:content-['\e92e'] after:block  after:!font-Icon after:text-[15px] after:font-thin" />
              <p class="font-firaSans underline font-light text-base text-[#666]">
                {infos?.whatsapp.label}
              </p>
            </a>
            <a href={infos?.tel.href} class="flex gap-2">
              <div class="after:content-['\e93a'] after:block  after:!font-Icon after:text-[15px] after:font-thin" />
              <p class="font-firaSans underline font-light text-base text-[#666]">
                {infos?.tel.label}
              </p>
            </a>
            <p class="text-xs mt-3 text-center text-[#ccc]">{infos?.service}</p>
          </div>

          {/* Compartilhar */}
          <div class="w-full flex justify-center flex-col items-center border-t border-[#666] p-3 pb-2">
            <p class="text-sm text-[#979899]">Comparte</p>
            <div class="flex flex-row gap-3 text-[#666] items-center">
              <a href={infos?.comparte.facebook}>
                <div class="after:content-['\e92b'] after:block  after:!font-Icon after:text-[20px] after:font-thin" />
              </a>

              <a class="text-text-color-secord" href={infos?.comparte.google}>
                <div class="after:content-['\e940'] after:block  after:!font-Icon after:text-[25px] after:font-thin" />
              </a>
              <a href={infos?.comparte.twitter}>
                <div class="after:content-['\e92c'] after:block  after:!font-Icon after:text-[15px] after:font-thin" />
              </a>
              <a href={infos?.comparte.pinterwst}>
                <div class="after:content-['\e941'] after:block  after:!font-Icon after:text-[20px] after:font-thin" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full px-10 flex justify-center">
        <div class="w-full max-w-[1200px] rounded-lg border border-[#ddd] bg-white">
          <div class="w-full flex justify-center text-[18px] leading-10">
            CARACTERÍSTICAS
          </div>
          <table class="w-full">
            {especifications?.map((item) => (
              <tbody class="odd:bg-[#f7f7f7]">
                <tr class="w-full flex gap-0.5">
                  <td class="w-[50%] p-1 text-end pr-2 font-semibold text-base flex items-center justify-end">
                    {item.name}
                  </td>
                  <td class="w-[50%] p-1 text-start pl-2">
                    {item.value}
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>

      <SliderJS rootId={id}></SliderJS>
    </>
  );
}

function ProductDetails(
  { page, infos }: Props,
) {
  /**
   * Showcase the different product views we have on this template. In case there are less
   * than two images, render a front-back, otherwhise render a slider
   * Remove one of them and go with the best suited for your use case.
   */
  return (
    <div class="py-0 sm:py-10">
      {page ? <Details page={page} infos={infos} /> : <NotFound />}
    </div>
  );
}

export default ProductDetails;
