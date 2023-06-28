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
          @font-face {
            font-family: 'Icon';
            src: url(${asset("/fonts/Icon.woff")}) format('woff');
          }
          @font-face {
            font-family: 'Fira Sans';
            font-weight: 900;
            src: url(${asset("/fonts/FiraSans-Black.woff")}) format('woff');
          }
          @font-face {
            font-family: 'Fira Sans';
            font-weight: 700;
            src: url(${asset("/fonts/FiraSans-Bold.woff")}) format('woff');
          }
          @font-face {
            font-family: 'Fira Sans';
            font-weight: 800;
            src: url(${asset("/fonts/FiraSans-ExtraBold.woff")}) format('woff');
          }
          @font-face {
            font-family: 'Fira Sans';
            font-weight: 200;
            src: url(${
            asset("/fonts/FiraSans-ExtraLight.woff")
          }) format('woff');
          }
          @font-face {
            font-family: 'Fira Sans';
            font-weight: 300;
            src: url(${asset("/fonts/FiraSans-Light.woff")}) format('woff');
          }
          @font-face {
            font-family: 'Fira Sans';
            font-weight: 500;
            src: url(${asset("/fonts/FiraSans-Medium.woff")}) format('woff');
          }
          @font-face {
            font-family: 'Fira Sans';
            font-weight: 400;
            src: url(${asset("/fonts/FiraSans-Regular.woff")}) format('woff');
          }
          @font-face {
            font-family: 'Fira Sans';
            font-weight: 600;
            src: url(${asset("/fonts/FiraSans-SemiBold.woff")}) format('woff');
          }
          @font-face {
            font-family: 'Fira Sans';
            font-weight: 100;
            src: url(${asset("/fonts/FiraSans-Thin.woff")}) format('woff');
          }
      `,
        }}
      />
    </Head>
  );
}

export default GlobalTags;
