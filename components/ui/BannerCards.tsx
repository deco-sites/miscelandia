import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import { Picture, Source } from "deco-sites/std/components/Picture.tsx";

export interface Image {
  /** @description Imagem Desktop */
  imgDesktop: LiveImage;
  /** @description Imagem Mobile */
  imgMobile: LiveImage;
  /** @description alt da imagem */
  alt: string;
  /** @description title da imagem */
  title: string;
  /** @description link da imagem */
  href: string;
}

export interface Props {
  /**@Imagens */
  primaryBanner: Image;
  /**@Imagens */
  secordBanner: Image;
  /**@Imagens */
  thirdBanner: Image;
}

function BannerCard({ primaryBanner, secordBanner, thirdBanner }: Props) {
  return (
    <>
      <div class="grid grid-cols-1 p-3 gap-4 sm:grid-cols-2 sm:px-5">
        <div class="rounded-xl p-[2px] hover:drop-shadow-md hover:opacity-80 ease-out duration-100">
          <a href={primaryBanner.href}>
            <Picture>
              <Source
                media="(max-width: 767px)"
                fetchPriority={"auto"}
                src={primaryBanner.imgMobile}
                width={360}
                height={300}
              />
              <Source
                media="(min-width: 768px)"
                fetchPriority={"auto"}
                src={primaryBanner.imgDesktop}
                width={887}
                height={735}
              />
              <img
                class="w-full"
                loading={"lazy"}
                preload="pazy"
                src={primaryBanner.imgMobile}
                alt={primaryBanner.alt}
              />
            </Picture>
          </a>
        </div>
        <div class="grid grid-cols-1 gap-3">
          <div class="rounded-xl p-[2px] hover:drop-shadow-md hover:opacity-80 ease-out duration-100">
            <a href={secordBanner.href}>
              <Picture>
                <Source
                  media="(max-width: 767px)"
                  fetchPriority={"auto"}
                  src={secordBanner.imgMobile}
                  width={360}
                  height={210}
                />
                <Source
                  media="(min-width: 768px)"
                  fetchPriority={"auto"}
                  src={secordBanner.imgDesktop}
                  width={887}
                  height={358}
                />
                <img
                  class="w-full"
                  loading={"lazy"}
                  preload="lazy"
                  src={secordBanner.imgMobile}
                  alt={secordBanner.alt}
                />
              </Picture>
            </a>
          </div>
          <div class="rounded-xl p-[2px] hover:drop-shadow-md hover:opacity-80 ease-out duration-100">
            <a href={thirdBanner.href}>
              <Picture>
                <Source
                  media="(max-width: 767px)"
                  fetchPriority={"auto"}
                  src={thirdBanner.imgMobile}
                  width={360}
                  height={210}
                />
                <Source
                  media="(min-width: 768px)"
                  fetchPriority={"auto"}
                  src={thirdBanner.imgDesktop}
                  width={887}
                  height={358}
                />
                <img
                  class="w-full"
                  loading={"lazy"}
                  preload="lazy"
                  src={thirdBanner.imgMobile}
                  alt={thirdBanner.alt}
                />
              </Picture>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default BannerCard;
