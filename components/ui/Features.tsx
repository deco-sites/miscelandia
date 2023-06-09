import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import Image from "deco-sites/std/components/Image.tsx";

export interface Feature {
  /**
   * @description Image src
   */
  icon: LiveImage;
  /**
   * @description Title
   */
  title: string;
  /**
   * @description Description and Image alt text
   */
  description: string;
}

export interface Props {
  features: Feature[];
}

function FeatureHighlights(
  { features }: Props,
) {
  return (
    <div class="min-h-[220px] sm:px-0 sm:mt-10 bg-white">
      <div class="border-base-200 border-t">
        <div class="flex flex-col justify-around divide-y divide-base-200 mx-6 sm:flex-row sm:divide-y-0 sm:divide-x sm:mx-0 sm:my-10">
          {features.map(({ icon, title, description }) => (
            <div class="flex flex-row gap-4 py-6 sm:flex-col sm:py-0 sm:px-8 sm:items-center w-full">
              <Image src={icon} width={45} />
              <div class="flex flex-col w-full gap-1">
                <span class="font-medium text-base font-firaSans text-center text-text-color-secord">
                  {title}
                </span>
                <span class="text-xs text-center font-firaSans text-text-color-secord">
                  {description}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FeatureHighlights;
