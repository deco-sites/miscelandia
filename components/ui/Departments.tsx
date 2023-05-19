import type { Image as LiveImage } from "deco-sites/std/components/types.ts";

export type Departament = {
  title: string;
  href: string;
  imagem: {
    img: LiveImage;
    alt: string;
    title: string;
  };
};

export interface Props {
  titleD: string;
  departaments: Departament[];
}

function Departments({ titleD, departaments }: Props) {
  return (
    <div class="flex flex-col my-4 md:my-7 justify-center items-center px-2">
      <h2 class="uppercase text-center tracking-wider font-firaSans text-text-color-secord mb-4 font-semibold text-xl">
        {titleD}
      </h2>
      <div class="grid grid-cols-3 grid-rows-2 gap-3 md:grid-rows-1 md:grid-cols-6 max-w-[950px]">
        {departaments.map((departament) => (
          <div class="w-full max-w-[150px]">
            <a
              class="flex flex-col justify-center items-center w-full h-full gap-2 border border-text-color-secord hover:border-default rounded p-2 bg-white drop-shadow-md hover:-translate-y-1 hover:drop-shadow-lg ease-out"
              href={departament?.href}
            >
              <image
                src={departament?.imagem.img}
                srcset={departament?.imagem.img}
                alt={departament?.imagem.alt}
                title={departament?.imagem.title}
                width={"40px"}
              >
              </image>
              <p class="text-text-color-secord text-center font-light text-sm uppercase">
                {departament?.title}
              </p>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Departments;
