export interface Props {
  /** @description Titulo */
  title: string;
  /** @description Conteudo */
  content: string;
}

function TextInfo({ title, content }: Props) {
  return (
    <>
      <div class="flex justify-center items-center my-14">
        <div class="px-7 max-w-[90%] sm:max-w-[60%]">
          <h2 class="font-firaSans text-xl text-text-color-secord font-bold text-center leading-5 mb-5">
            {title}
          </h2>
          <p class="text-sm font-firaSans text-text-color-secord text-center leading-4">
            {content}
          </p>
        </div>
      </div>
    </>
  );
}

export default TextInfo;
