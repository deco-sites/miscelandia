import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import SliderControllerJS from "deco-sites/fashion/islands/SliderJS.tsx";
import Button from "./Button.tsx";
import Icon from "./Icon.tsx";
import { Slider } from "./Slider.tsx";

export interface Seller {
  /** @description imagem da marca */
  image: LiveImage;
  /** @description alt da imagem */
  alt: string;
  /** @description title da imagem */
  title: string;
  /** @description link da marca */
  href: string;
}

export interface Props {
  /**@description Titulo */
  title: string;
  /**@description Marcas */
  marcas?: Seller[];
}

function ItemMarca({ marca }: { marca: Seller }) {
  const { image, alt, title, href } = marca;
  return (
    <div class=" flex justify-center items-center grayscale hover:grayscale-0 min-w-[130px] max-w-[130px] sm:max-w-[180px] 2xl:min-w-[280px] sm:min-w-[180px] 2xl:max-w-[280px]">
      <a href={href}>
        <image
          class="w-full max-w-[180px]"
          src={image}
          alt={alt}
          title={title}
          width={130}
          height={54}
          loading="lazy"
        />
      </a>
    </div>
  );
}

function Controls() {
  return (
    <>
      <div class="flex items-center justify-center z-10 col-start-1 row-start-2">
        <Button
          class="bg-transparent border-transparent hover:bg-transparent hover:border-transparent p-0"
          data-slide="prev"
          aria-label="Previous item"
        >
          <Icon
            class="text-default "
            size={30}
            id="ChevronLeft"
            strokeWidth={3}
          />
        </Button>
      </div>
      <div class="flex items-center justify-center z-10 col-start-3 row-start-2">
        <Button
          class="bg-transparent border-transparent hover:bg-transparent hover:border-transparent p-0"
          data-slide="next"
          aria-label="Next item"
        >
          <Icon
            class="text-default"
            size={30}
            id="ChevronRight"
            strokeWidth={3}
          />
        </Button>
      </div>
    </>
  );
}

function sellerSlider({ title, marcas }: Props) {
  const id = "Seller";
  return (
    <>
      <div class="flex justify-center items-center bg bg-white mx-2">
        <div class="bg-white mx-3 flex flex-col py-6 sm:max-w-[94%] sm:py-8 ">
          <div>
            <h2 class="font-firaSans font-semibold text-lg uppercase tracking-widest  mt-4 sm:px-10 sm:mb-7 text-text-color-secord">
              {title}
            </h2>
          </div>
          <div
            class="grid justify-items-center grid-cols-[0px_1fr_0px] sm:grid-cols-[50px_1fr_50px] grid-rows-[20px_1fr_20px]"
            id={id}
          >
            <Slider
              class="col-span-full row-span-full scrollbar-none gap-2 max-w-[87%] sm:max-w-[95%] sm:mx-auto"
              snap="snap-start sm:snap-start block first:ml-3 sm:first:ml-0 last:mr-3 sm:last:mr-0"
            >
              {marcas?.map((marca, index) => <ItemMarca marca={marca} />)}
            </Slider>

            <Controls />

            <SliderControllerJS rootId={id} interval={0} />
          </div>
        </div>
      </div>
    </>
  );
}

export default sellerSlider;
