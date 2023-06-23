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
    <div class="flex w-full gap-2 items-center">
      <QuantitySelector
        disabled={price === 0}
        quantity={quantity.value}
        onChange={(newQuantity) => {
          quantity.value = newQuantity;
        }}
      />
      <div class="max-h-[36px] overflow-hidden flex items-center rounded-full justify-center">
        <AddToCartButton
          skuId={skuId}
          sellerId={sellerId}
          price={price ?? 0}
          discount={discount}
          name={name}
          productGroupId={productGroupId}
          quantity={quantity.value}
        />
      </div>
    </div>
  );
}

export default QuantityAddToCartButton;
