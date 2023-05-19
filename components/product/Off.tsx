import { asset } from "$fresh/runtime.ts";
import type { Product } from "deco-sites/std/commerce/types.ts";
import { useOffer } from "deco-sites/fashion/sdk/useOffer.ts";

function Off({ product }: { product: Product }) {
  const { offers } = product;
  const { listPrice, price } = useOffer(offers);

  if (!listPrice || !price) {
    return <></>;
  }

  if (listPrice != price) {
    const off = 100 - ((price / listPrice) * 100);

    return (
      <>
        <div
          style={`background-image: url(${asset("/discount-bg.webp")})`}
          class="bg-contain min-w-[50px] min-h-[50px] flex justify-center items-center"
        >
          <p class="text-center text-white font-firaSans font-semibold text-sm leading-3">
            {off + " %"}
          </p>
        </div>
      </>
    );
  } else {
    return <></>;
  }
}

export default Off;
