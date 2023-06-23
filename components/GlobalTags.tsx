import { asset, Head } from "$fresh/runtime.ts";

function GlobalTags() {
  return (
    <Head>
      {/* Tailwind v3 CSS file */}
      <link href={asset("/main.css")} rel="stylesheet" />

      {/* Custom CSS */}
      <link href={asset("/custom.css")} rel="preload" />

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
        url('https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;700;900&display=swap');
      </style>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          /* latin-ext */
          @font-face {
            font-family: 'Icon';
            font-style: normal;
            font-weight: 400;
            font-display: swap;
            src: url(${
            asset("/fonts/b18fbb6dbda6ac0c3a7053aa953b54e9.woff")
          }) format('woff');
            unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
          }
      `,
        }}
      />
    </Head>
  );
}

export default GlobalTags;
