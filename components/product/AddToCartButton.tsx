import Button from "deco-sites/fashion/components/ui/Button.tsx";
import {
  Options as UseAddToCartProps,
  useAddToCart,
} from "deco-sites/fashion/sdk/useAddToCart.ts";
import Icon from "../ui/Icon.tsx";

interface Props extends UseAddToCartProps {
  /**
   * @description Product id
   */
  sellerId: string;
  quantity?: number;
  iconSize?: "lg" | "sm";
}

function AddToCartButton(
  {
    skuId,
    sellerId,
    discount,
    price,
    productGroupId,
    name,
    quantity,
    iconSize = "lg",
  }: Props,
) {
  const props = useAddToCart({
    skuId,
    sellerId,
    discount,
    price,
    productGroupId,
    name,
    quantity,
  });

  return (
    <Button
      data-deco="add-to-cart"
      {...props}
      class="bg-default border-default hover:border-[#EC4B76] hover:bg-[#EC4B76]  flex flex-nowrap items-center justify-center gap-1 btn shrink rounded-xl px-3 py-[10px] h-min"
    >
      {iconSize === "lg"
        ? (
          <span class="text-white after:content-['\e905'] after:block  after:!font-Icon after:text-[20px] after:font-thin">
          </span>
        )
        : (
          <span class="text-white after:content-['\e905'] after:block  after:!font-Icon after:text-[14px] after:font-thin">
          </span>
        )}

      <span class="w-min !text-white !font-bold tracking-[1.2px]">Comprar</span>
    </Button>
  );
}

export default AddToCartButton;
