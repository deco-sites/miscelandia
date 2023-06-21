import Image from "deco-sites/std/components/Image.tsx";
import { headerHeight } from "./constants.ts";

export interface INavItem {
  label: string;
  colorBorder?: string;
  href: string;
  children?: Array<{
    label: string;
    href: string;
    children?: Array<{
      label: string;
      href: string;
    }>;
  }>;
}

function NavItem({ item }: { item: INavItem }) {
  const { href, label, colorBorder, children } = item;

  return (
    <li class="group flex items-center group">
      <a
        href={href}
        class="px-4 py-3 border-b-[5px] min-w-[140px] hover:bg-slate-400 ease-linear text-center"
        style={`border-color: ${colorBorder}`}
      >
        <span class=" font-Lato text-base font-bold tracking-wider text-text-color-secord group-hover:text-text-color-primary">
          {label}
        </span>
      </a>
      {children && children.length > 0 &&
        (
          <div
            class="w-full fixed hidden hover:flex group-hover:flex bg-base-100 z-50 items-start justify-center gap-6 border-base-200"
            style={{
              top: "0px",
              left: "0px",
              marginTop: "52px",
            }}
          >
            <div
              class="animate-[wiggle_1s_ease-in-out]"
              style={`background: ${colorBorder}; width: 100%; height:4px; position:absolute; top:-4px; `}
            >
            </div>
            {
              /* {image?.src && (
              <Image
                class="p-6"
                src={image.src}
                alt={image.alt}
                width={300}
                height={332}
                loading="lazy"
              />
            )} */
            }
            <div class="flex items-start justify-between w-11/12 gap-6">
              <ul class="flex items-start justify-center gap-12">
                {children.map((node) => (
                  <li class="py-6 px-2">
                    <a
                      class="hover:underline font-Lato font-bold text-text-color-primary uppercase text-lg "
                      href={node.href}
                    >
                      <span>{node.label}</span>
                    </a>

                    <ul class="flex flex-col gap-1 mt-4">
                      {node.children?.map((leaf) => (
                        <li class="border-b border-[#efefef] h-min group/item ">
                          <a
                            class="font-Lato"
                            href={leaf.href}
                          >
                            <p class="text-sm px-[6px] leading-6 font-bold text-medium-gray group-hover/item:text-default transition-all duration-200 group-hover/item:bg-light-gray">
                              {leaf.label}
                            </p>
                          </a>
                        </li>
                      ))}
                      {node.children && (
                        <li>
                          <a
                            class="text-text-color-primary underline font-Lato text-base tracking-wide "
                            href={node.href}
                          >
                            <span>
                              {"> Ver mais " + node.label.toLowerCase()}
                            </span>
                          </a>
                        </li>
                      )}
                    </ul>
                  </li>
                ))}
              </ul>
              <div class="p-6">
                <a href={href}>
                  <p class="text-default text-center text-base">
                    Ver mais
                  </p>
                  <p class="text-base text-center uppercase font-bold text-default">
                    {label}
                  </p>
                </a>
              </div>
            </div>
          </div>
        )}
    </li>
  );
}

export default NavItem;
