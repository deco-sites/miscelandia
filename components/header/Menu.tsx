import Icon from "deco-sites/fashion/components/ui/Icon.tsx";
import type { INavItem } from "./NavItem.tsx";

export interface Props {
  items: INavItem[];
}

function MenuItem({ item }: { item: INavItem }) {
  return (
    <div class="collapse collapse-plus">
      <input type="checkbox" />
      <div
        class="collapse-title border-b-[5px] font-Lato text-text-color-secord font-bold"
        style={`border-color: ${item.colorBorder}`}
      >
        {item.label}
      </div>
      <div class="collapse-content">
        <ul>
          {item.children?.map((node) => (
            <li>
              <div>
                <p class="font-Lato uppercase text-default text-base font-bold border-b px-1 mb-3 mt-4 border-stone-400">
                  {node.label}
                </p>
                <ul>
                  {node.children?.map((subitem) => (
                    <li class="border-b px-1 my-3 border-stone-400">
                      <a class="text-base text-text-color-secord">
                        {subitem.label}
                      </a>
                    </li>
                  ))}
                  <li class="border-b px-1 mb-3 border-stone-400">
                    <a
                      class="text-base text-default underline"
                      href={node.linkMore?.href}
                    >
                      <p>Mostrar mais</p>
                    </a>
                  </li>
                </ul>
              </div>
            </li>
          ))}
          <div class="w-full justify-center items-center">
            <a href={item.href}>
              <p class="text-lg text-default text-center">
                Ver todo
              </p>
              <p class="text-lg text-default font-bold text-center">
                {item.label}
              </p>
            </a>
          </div>
        </ul>
      </div>
    </div>
  );
}

function Menu({ items }: Props) {
  return (
    <>
      <ul class="flex-grow flex flex-col divide-y divide-base-200">
        {items.map((item) => (
          <li>
            <MenuItem item={item} />
          </li>
        ))}
      </ul>

      <ul class="flex flex-col py-2">
        <li>
          <a
            class="flex items-center gap-4 px-4 py-2"
            href="/wishlist"
          >
            <Icon id="Truck" width={15} height={15} strokeWidth={2} />
            <span class="text-xs text-text-color-secord">Mis Pedidos</span>
          </a>
        </li>
        <li>
          <a
            class="flex items-center gap-4 px-4 py-2"
            href="https://www.deco.cx"
          >
            <Icon id="Money" width={15} height={15} strokeWidth={2} />
            <span class="text-xs text-text-color-secord">Como Comprar</span>
          </a>
        </li>
        <li>
          <a
            class="flex items-center gap-4 px-4 py-2"
            href="https://www.deco.cx"
          >
            <Icon id="ShoppingCar" width={15} height={15} strokeWidth={2} />
            <span class="text-xs text-text-color-secord">
              Mi carrito de compras
            </span>
          </a>
        </li>
        <li>
          <a
            class="flex items-center gap-4 px-4 py-2"
            href="https://www.deco.cx"
          >
            <Icon id="WhatsApp" width={15} height={15} strokeWidth={2} />
            <span class="text-xs text-text-color-secord">(+57) 3202337279</span>
          </a>
        </li>
        <li>
          <a
            class="flex items-center gap-4 px-4 py-2"
            href="https://www.deco.cx"
          >
            <Icon id="Email" width={15} height={15} strokeWidth={2} />
            <span class="text-xs text-text-color-secord">
              ventas@miscelandia.com.co
            </span>
          </a>
        </li>
      </ul>
    </>
  );
}

export default Menu;
