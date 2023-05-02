import type { Image as LiveImage } from "deco-sites/std/components/types.ts";

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
  firstIcon?: Rede;
  /** @description rede social*/
  secordIcon?: Rede;
  /** @description rede social*/
  thirdIcon?: Rede;
}

export interface Newsletter {
  newsletter?: Props;
}

function Newsletter(
  { newsletter }: Newsletter,
) {
  return (
    <div class="flex flex-col items-center gap-6 sm:gap-5 py-5 bg-newsletter">
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
        <div class="flex flex-row gap-6">
          <a href={newsletter?.firstIcon?.href}>
            <image
              src={newsletter?.firstIcon?.img}
              alt={newsletter?.firstIcon?.alt}
              title={newsletter?.firstIcon?.titleI}
              width={35}
              height={35}
            />
          </a>
          <a href={newsletter?.secordIcon?.href}>
            <image
              src={newsletter?.secordIcon?.img}
              alt={newsletter?.secordIcon?.alt}
              title={newsletter?.secordIcon?.titleI}
              width={35}
              height={35}
            />
          </a>
          <a href={newsletter?.thirdIcon?.href}>
            <image
              src={newsletter?.thirdIcon?.img}
              alt={newsletter?.thirdIcon?.alt}
              title={newsletter?.thirdIcon?.titleI}
              width={35}
              height={35}
            />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Newsletter;
