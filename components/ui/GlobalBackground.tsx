import type { Image as LiveImage } from "deco-sites/std/components/types.ts";

export interface Props {
  image: LiveImage;
}

const GlobalBackground = ({ image }: Props) => {
  return (
    <style>
      {`body {
            background-image: url(${image})
        }`}
    </style>
  );
};

export default GlobalBackground;
