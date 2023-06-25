import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import Icon, {
  AvailableIcons,
} from "deco-sites/fashion/components/ui/Icon.tsx";

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
export interface Props {
  /** @description Titulo */
  titleN: string;
  /** @description Conteudo */
  content: string;
  /** @description rede social*/
  icons: { icon: AvailableIcons; title: string; path: string }[];
}

export interface Newsletter {
  newsletter?: Props;
}

function Newsletter(
  { newsletter }: Newsletter,
) {
  return (
    <div class=" container flex flex-col items-center gap-6 sm:gap-5 py-5 bg-newsletter">
      <div class="flex flex-col gap-2 max-w-[400px] text-center">
        <span class="font-Lato text-3xl uppercase font-extrabold leading-7 text-text-color-primary">
          {newsletter?.titleN}
        </span>
        <span class="text-xl font-Lato font-light text-white">
          {newsletter?.content}
        </span>
      </div>
      <form class="flex flex-col items-center gap-2 font-body text-body w-full sm:w-[500px] sm:flex-row">
        <input
          class="py-2 px-3 text-sm w-full flex-grow text-center bg-white border-default bordered rounded-3xl text-text-color-secord border border-solid border-base-100"
          placeholder="Ingresa tu e-mail"
        />
        <button
          class="py-2 px-8 uppercase text-sm font-bold bg-base-100 text-base-content rounded-full bg-default text-white"
          type="button" // prevent form's default behavior
        >
          Enviar
        </button>
      </form>
      <div>
        <div class="flex flex-row gap-6 items-center">
          {newsletter?.icons.map((icon) => (
            <a
              href={icon.path}
              class="text-white hover:text-header transiotion-all duration-200 w-6 h-6"
            >
              <Icon
                id={icon.icon}
                strokeWidth={2}
                class="w-full h-full"
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Newsletter;
