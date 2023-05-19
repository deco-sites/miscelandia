import Button from "../ui/Button.tsx";

interface Props {
  quantity: number;
  disabled?: boolean;
  loading?: boolean;
  onChange?: (quantity: number) => void;
}

const QUANTITY_MAX_VALUE = 100;

// Remove default browser behavior: https://www.w3schools.com/howto/howto_css_hide_arrow_number.asp
// TODO: Figure out how to add it via tailwind config.
const innerStyle = `
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}
`;

function QuantitySelector({ onChange, quantity, disabled, loading }: Props) {
  const decrement = () => onChange?.(Math.max(0, quantity - 1));

  const increment = () =>
    onChange?.(Math.min(quantity + 1, QUANTITY_MAX_VALUE));

  return (
    <div class="form-control">
      <div class="flex ">
        <Button
          class="rounded-full bg-white border h-[40px] w-[40px] p-2 min-w-[40px] min-h-[40px]"
          onClick={decrement}
          disabled={disabled}
          loading={loading}
        >
          -
        </Button>
        <input
          class="input border-base-content border-x-0 text-center h-[40px] mx-2 rounded-none"
          type="number"
          inputMode="numeric"
          pattern="[0-9]*"
          max={QUANTITY_MAX_VALUE}
          min={1}
          value={quantity}
          disabled={disabled}
          onBlur={(e) => onChange?.(e.currentTarget.valueAsNumber)}
        />
        <Button
          class="rounded-full bg-white border h-[40px] w-[40px] p-2 min-w-[40px] min-h-[40px]"
          onClick={increment}
          disabled={disabled}
          loading={loading}
        >
          +
        </Button>
      </div>
    </div>
  );
}

export default QuantitySelector;
