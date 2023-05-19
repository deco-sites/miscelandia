import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import { Picture, Source } from "deco-sites/std/components/Picture.tsx";

export interface Image {
  /** @description Imagem desktop */
  imgdesktop: LiveImage;
  /** @description Imagem mobile */
  imgmobile: LiveImage;
  /** @description alt da imagem */
  alt: string;
  /** @description title da imagem */
  title: string;
  /** @description link da imagem */
  href: string;
}

export interface Props {
  /** @description Primeira Imagem */
  firstImage: Image;
  /** @description Segunda Imagem */
  secordImage: Image;
}

function BannerNewCollection({ firstImage, secordImage }: Props) {
  return (
    <>
      <div class="grid grid-cols-1 grid-rows-2 gap-3 sm:gap-6 px-2 sm:px-9 sm:grid-cols-2 sm:grid-rows-1 mt-5 sm:mt-14">
        <div class="hover:opacity-80 ease-out duration-100 hover:drop-shadow-md">
          <a href={firstImage.href}>
            <Picture>
              <Source
                media="(max-width: 767px)"
                fetchPriority={"low"}
                src={firstImage.imgmobile}
                width={344}
                height={160}
              />
              <Source
                media="(min-width: 768px)"
                fetchPriority={"low"}
                src={firstImage.imgdesktop}
                width={590}
                height={268}
              />
              <img
                class="object-cover w-full sm:h-full rounded-2xl"
                loading={"lazy"}
                src={firstImage.imgmobile}
                alt={firstImage.alt}
                title={firstImage.title}
              />
            </Picture>
          </a>
        </div>
        <div class="hover:opacity-80 ease-out duration-100 hover:drop-shadow-md">
          <a href={secordImage.href}>
            <Picture>
              <Source
                media="(max-width: 767px)"
                fetchPriority={"low"}
                src={secordImage.imgmobile}
                width={344}
                height={160}
              />
              <Source
                media="(min-width: 768px)"
                fetchPriority={"low"}
                src={secordImage.imgdesktop}
                width={590}
                height={268}
              />
              <img
                class="object-cover w-full sm:h-full rounded-2xl"
                loading={"lazy"}
                src={secordImage.imgmobile}
                alt={secordImage.alt}
                title={secordImage.title}
              />
            </Picture>
          </a>
        </div>
      </div>
    </>
  );
}

export default BannerNewCollection;
