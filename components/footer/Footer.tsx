import Icon, {
  AvailableIcons,
} from "deco-sites/fashion/components/ui/Icon.tsx";
import { asset, Head } from "$fresh/runtime.ts";
import type { ComponentChildren } from "preact";
import Newsletter from "./Newsletter.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";

export type IconItem = { icon: AvailableIcons };
export type StringItem = {
  label: string;
  href: string;
};

export type Item = StringItem | IconItem;

export type Icons = {
  prevIcon?: AvailableIcons;
  label: string;
  href: string;
};

export type Section = {
  label: string;
  children?: Icons[];
};

function SectionItem({ item }: { item: Icons }) {
  return (
    <span class="uppercase font-firaSans text-sm font-light text-text-color-white hover:text-default">
      {item.prevIcon
        ? (
          <a class="flex flex-row items-center gap-2" href={item.href}>
            <div class="">
              <Icon
                id={item.prevIcon}
                width={25}
                height={20}
                strokeWidth={1}
              />
            </div>
            <span>
              {item.label}
            </span>
          </a>
        )
        : (
          <a href={item.href}>
            {item.label}
          </a>
        )}
    </span>
  );
}

function FooterContainer(
  { children, class: _class = "" }: {
    class?: string;
    children: ComponentChildren;
  },
) {
  return (
    <div class={`py-6 sm:py-7 sm:px-0  ${_class}`}>
      {children}
    </div>
  );
}

export type ItemImg = {
  img: LiveImage;
  alt: string;
  title: string;
  width: number;
  height: number;
};

export interface imgProps {
  tittle?: string;
  imgs: ItemImg;
}

function ItemImg({ imgs }: { imgs: ItemImg }) {
  const { img, alt, title, width, height } = imgs;
  return (
    <>
      <image
        alt={img}
        src={alt}
        srcSet={img}
        title={title}
        width={width}
        height={height}
        loading="lazy"
      />
    </>
  );
}
export interface Rede {
  /** @description Imagem */
  img: LiveImage;
  /** @description alt */
  alt: string;
  /** @description titulo */
  titleI: string;
  /** @description link */
  href: string;
}
export interface NewsletterProps {
  /** @description Titulo */
  titleN: string;
  /** @description Conteudo */
  content: string;
  /** @description rede social*/
  icons: { icon: AvailableIcons; title: string; path: string }[];
}

export interface LogoFooter {
  /** @description link */
  href?: string;
}

export interface Props {
  sections?: Section[];

  newsletter: NewsletterProps;

  logo?: LogoFooter;

  InfosFooter?: imgProps[];
}

function Footer({ sections = [], newsletter, logo, InfosFooter }: Props) {
  return (
    <footer class="w-full flex flex-col">
      <div>
        <div class="w-full flex flex-col border-b-1 border-gray-100">
          <FooterContainer class="bg-newsletter px-4">
            <Newsletter newsletter={newsletter} />
          </FooterContainer>

          <FooterContainer class="bg-footer  px-8 border-b-2 border-default border-solid">
            {/* Desktop view */}
            <ul class="hidden container sm:flex flex-row gap-6 justify-around">
              <li class="w-full flex justify-center items-center">
                <a
                  href={logo?.href}
                  class="flex flex-col items-center gap-[10px]"
                >
                  <div class="text-default after:content-['\e93c'] after:block  after:!font-Icon after:text-[120px] after:font-thin after:leading-[130px]" />
                  <div class="text-default after:content-['miscelandia'] after:block  after:!font-firaSans after:text-[13px] after:font-bold " />
                </a>
              </li>
              {sections.map((section) => (
                <li class=" border-white border-r last:border-r-0 last:justify-start pr-2 last:pr-0 flex justify-center w-full">
                  <div class="">
                    <span class="text-lg uppercase font-firaSans font-semibold text-text-color-white">
                      {section.label}
                    </span>

                    <ul
                      class={`flex flex-col gap-1 pt-4`}
                    >
                      {section.children?.map((item) => (
                        <li>
                          <SectionItem item={item} />
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ul>

            {/* Mobile view */}
            <div class="flex justify-center items-center mb-3 w-full sm:hidden">
              <a
                href={logo?.href}
                class="flex flex-col items-center gap-[10px]"
              >
                <div class="text-default after:content-['\e93c'] after:block  after:!font-Icon after:text-[120px] after:font-thin after:leading-[130px]" />
                <div class="text-default after:content-['miscelandia'] after:block  after:!font-firaSans after:text-[13px] after:font-bold " />
              </a>
              {
                /* <span>
                {logo?.text}
              </span> */
              }
            </div>
            <ul class="flex flex-col sm:hidden sm:flex-row gap-6">
              {sections.map((section) => (
                <li>
                  <span class="text-text-color-white ">
                    <span class="font-firaSans font-bold text-lg uppercase">
                      {section.label}
                    </span>

                    <ul
                      class={`flex flex-col gap-5 pt-4`}
                    >
                      {section.children?.map((item) => (
                        <li>
                          <SectionItem item={item} />
                        </li>
                      ))}
                    </ul>
                  </span>
                </li>
              ))}
            </ul>
          </FooterContainer>
        </div>
      </div>

      <div>
        <div class="sm:px-10 w-full bg-white">
          <FooterContainer class="flex justify-center items-center bg-white">
            <div class="flex flex-col justify-center items-center">
              <div class="sm:grid sm:grid-cols-4 sm:grid-rows-2 sm:grid-flow-row sm:gap-x-6">
                {InfosFooter?.map((infos) => (
                  <div class="sm:last:col-start-2">
                    <h2 class="text-center text-lg tracking-wider font-firaSans text-text-color-secord font-light mt-8 mb-3 sm:mt-0 uppercase">
                      {infos?.tittle}
                    </h2>
                    <div>
                      <div>
                        <ItemImg imgs={infos.imgs} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div class="flex flex-col justify-center items-center w-full sm:flex-row sm:justify-around pt-4 sm:pb-2">
                <image
                  src={asset("/logo-direitos.svg")}
                  width={90}
                  height={20}
                  loading="lazy"
                />
                <span class="font-firaSans font-text-base text-sm mt-2 mb-6 sm:m-0">
                  Todos los derechos reservados Miscelandia 2022
                </span>
                <div class="flex flex-row justify-center items-center gap-5">
                  <image
                    src={asset("/vtex.png")}
                    width={66}
                    height={25}
                    loading="lazy"
                  />
                  <image
                    src={asset("/logo-jump.png")}
                    width={35}
                    height={27}
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </FooterContainer>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
