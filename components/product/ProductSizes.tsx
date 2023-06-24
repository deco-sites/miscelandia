import { useSignal } from "@preact/signals";
import Image from "deco-sites/std/components/Image.tsx";
import Button from "deco-sites/fashion/components/ui/Button.tsx";
import Icon from "deco-sites/fashion/components/ui/Icon.tsx";
import Modal from "deco-sites/fashion/components/ui/Modal.tsx";
import { Slider } from "deco-sites/fashion/components/ui/Slider.tsx";
import SliderJS from "deco-sites/fashion/islands/SliderJS.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";

interface Props {
  image: LiveImage;
}

function ProductSizes({ image }: Props) {
  const open = useSignal(false);

  return (
    <>
      <p onClick={() => open.value = true} class="text-[#666666] font-medium">
        CLICK AQUÍ PARA GUÍA DE TALLAS
      </p>
      <Modal
        loading="lazy"
        mode="center"
        title={"Guía de tallas"}
        open={open.value}
        onClose={() => {
          open.value = false;
        }}
      >
        <div class="relative max-w-[450px]" id="product-zoom">
          <Image
            src={image}
            class="h-full"
            width={450}
          />
        </div>
      </Modal>
    </>
  );
}

export default ProductSizes;
