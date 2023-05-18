import type { LoaderReturnType } from "$live/types.ts";
import type { ProductListingPage } from "deco-sites/std/commerce/types.ts";

export type Text = {
  matcher: string;
  title: string;
  content: string;
};

export interface Props {
  page?: LoaderReturnType<ProductListingPage | null>;
  texts: Text[];
}

function Text({ text }: { text: Text }) {
  const { title, content } = text;

  return (
    <div class="w-full flex flex-col justify-center items-center py-5 mb-9 px-2">
      <h2 class="uppercase text-text-color-secord tracking-wide font-bold text-xl text-center">
        {title}
      </h2>
      <p class="text-text-color-secord text-sm text-center">
        {content}
      </p>
    </div>
  );
}

function TextSEOPLP({ page, texts }: Props) {
  if (!page || page.breadcrumb.itemListElement.length === 0) {
    return null;
  }

  const { item: canonical } = page
    .breadcrumb
    .itemListElement
    .reduce((curr, acc) => curr.position > acc.position ? curr : acc);

  const matching = texts.find(({ matcher }) =>
    new RegExp(matcher).test(canonical)
  );

  if (!matching) {
    return null;
  }

  return <Text text={matching} />;
}

export default TextSEOPLP;
