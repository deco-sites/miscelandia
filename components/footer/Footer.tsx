import Icon, {
  AvailableIcons,
} from "deco-sites/fashion/components/ui/Icon.tsx";
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
          <a class="flex flex-row items-center" href={item.href}>
            <div class="">
              <Icon
                id={item.prevIcon}
                width={25}
                height={20}
                strokeWidth={0.01}
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
  firstIcon?: Rede;
  /** @description rede social*/
  secordIcon?: Rede;
  /** @description rede social*/
  thirdIcon?: Rede;
}

export interface LogoFooter {
  /** @description logo */
  logo: LiveImage;
  /** @description alt */
  alt: string;
  /** @description title */
  title: string;
  /** @description link */
  href?: string;
  /** @description text */
  text: string;
}
export interface Props {
  sections?: Section[];

  newsletter: NewsletterProps;

  logo?: LogoFooter;
}

function Footer({ sections = [], newsletter, logo }: Props) {
  return (
    <footer class="w-full bg-primary flex flex-col">
      <div>
        <div class="w-full flex flex-col border-b-1 border-gray-100">
          <FooterContainer class="bg-newsletter px-4">
            <Newsletter newsletter={newsletter} />
          </FooterContainer>

          <FooterContainer class="bg-footer  px-8 border-b-2 border-default border-solid">
            {/* Desktop view */}
            <ul class="hidden container sm:flex flex-row gap-6 first:border-none last:border-none justify-around">
              <li class="w-full">
                <a href={logo?.href}>
                  <image
                    src={logo?.logo}
                    alt={logo?.alt}
                    title={logo?.title}
                    width={201}
                    height={168}
                  />
                </a>
              </li>
              {sections.map((section) => (
                <li class="border-r-[1px] pr-6 border-white first:border-none last:border-r-0 w-full">
                  <div>
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
            <div class="flex justify-center items-center w-full sm:hidden">
              <a href={logo?.href}>
                <image
                  src={logo?.logo}
                  alt={logo?.alt}
                  title={logo?.title}
                  width={156}
                  height={132}
                />
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
        <div class="container w-full">
          <FooterContainer class="flex justify-between w-full">
            <span class="flex items-center gap-1 text-primary-content">
              Powered by{" "}
              <a
                href="https://www.deco.cx"
                aria-label="powered by https://www.deco.cx"
              >
                <Icon id="Deco" height={20} width={60} strokeWidth={0.01} />
              </a>
            </span>

            <ul class="flex items-center justify-center gap-2">
              <li>
                <a
                  href="https://www.instagram.com/deco.cx"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram logo"
                >
                  <Icon
                    class="text-primary-content"
                    width={32}
                    height={32}
                    id="Instagram"
                    strokeWidth={1}
                  />
                </a>
              </li>
              <li>
                <a
                  href="http://www.deco.cx/discord"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Discord logo"
                >
                  <Icon
                    class="text-primary-content"
                    width={32}
                    height={32}
                    id="Discord"
                    strokeWidth={5}
                  />
                </a>
              </li>
            </ul>
          </FooterContainer>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
