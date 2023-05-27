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
}

function AddToCartButton(
  { skuId, sellerId, discount, price, productGroupId, name, quantity }: Props,
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
      class="bg-default border-default hover:border-[#EC4B76] hover:bg-[#EC4B76] w-full h-8 flex items-center justify-center gap-4 btn shrink rounded-xl"
    >
      <Icon
        class="w-min"
        id="ShoppingCarr"
        width={25}
        height={25}
      />

      <span class="w-min">Comprar</span>
    </Button>
  );
}

export default AddToCartButton;
