import Icon, {
  AvailableIcons,
} from "deco-sites/fashion/components/ui/Icon.tsx";

export interface Feature {
  /**
   * @description Image src
   */
  icon: AvailableIcons;
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
    <div class="container min-h-[220px] sm:px-0 sm:pt-10 bg-white">
      <div class="border-base-200 border-t">
        <div class="flex flex-col justify-evenly divide-y divide-base-200 mx-6 sm:flex-row sm:divide-y-0 sm:divide-x sm:mx-0 sm:my-10">
          {features.map(({ icon: id = "Truck", title, description }) => (
            <div class="flex flex-row gap-4 py-6 sm:flex-col sm:py-0 sm:px-8 sm:items-center">
              <Icon
                id={id}
                width={40}
                height={40}
                strokeWidth={2}
              />
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
