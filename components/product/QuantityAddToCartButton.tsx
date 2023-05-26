import {
  Options as UseAddToCartProps,
} from "deco-sites/miscelandia/sdk/useAddToCart.ts";
import { useSignal } from "@preact/signals";
import QuantitySelector from "deco-sites/miscelandia/islands/QuantitySelector.tsx";
import AddToCartButton from "deco-sites/miscelandia/islands/AddToCartButton.tsx";

interface Props extends UseAddToCartProps {
  /**
   * @description Product id
   */
  sellerId: string;
  text?: string;
  variant?: "secondary" | "icon" | "primary" | "tertiary" | "green";
}

function QuantityAddToCartButton(
  {
    skuId,
    sellerId,
    discount,
    price,
    productGroupId,
    name,
  }: Props,
) {
  const quantity = useSignal(1);

  return (
    <div class="flex w-full gap-2 ">
      <QuantitySelector
        disabled={price === 0}
        quantity={quantity.value}
        onChange={(newQuantity) => {
          quantity.value = newQuantity;
        }}
      />
      <AddToCartButton
        skuId={skuId}
        sellerId={sellerId}
        price={price ?? 0}
        discount={discount}
        name={name}
        productGroupId={productGroupId}
        quantity={quantity.peek()}
      />
    </div>
  );
}

export default QuantityAddToCartButton;
