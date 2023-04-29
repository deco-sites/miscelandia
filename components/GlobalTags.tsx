import { asset, Head } from "$fresh/runtime.ts";

function GlobalTags() {
  return (
    <Head>
      {/* Tailwind v3 CSS file */}
      <link href={asset("/main.css")} rel="stylesheet" />

      {/* Custom CSS */}
      <link href={asset("/custom.css")} rel="stylesheet" />

      {/* Icons */}
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href={asset("/favicon-32x32.png")}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href={asset("/favicon-16x16.png")}
      />
      <link
        rel="shortcut icon"
        type="image/x-icon"
        href={asset("/favicon-32x32.png")}
      />

      {/* Web Manifest */}
      <link rel="manifest" href={asset("/site.webmanifest")} />

      {/* Fonts */}

      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,100;0,300;0,400;0,500;0,600;0,700;1,100;1,200&display=swap');
        @import
        url('https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;700;900&display=swap');
      </style>
    </Head>
  );
}

export default GlobalTags;
