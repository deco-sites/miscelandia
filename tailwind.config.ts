// Daisi UI theme
export const theme = {
  "primary": "hsl(180 100% 10%)",
  "secondary": "hsl(0 39% 39%)",
  "accent": "hsl(150 100% 50%)",
  "neutral": "hsl(0 0% 20%)",
  "base-100": "hsl(0 0% 100%)",
  "success": "hsl(150 62% 95%)",
  "warning": "hsl(43 100% 95%)",
  "error": "hsl(9 100% 95%)",
  "info": "hsl(220 100% 97%)",

  "--rounded-box": "1rem", // border radius rounded-box utility class, used in card and other large boxes
  "--rounded-btn": "0.5rem", // border radius rounded-btn utility class, used in buttons and similar element
  "--rounded-badge": "1.9rem", // border radius rounded-badge utility class, used in badges and similar
  "--animation-btn": "0.25s", // duration of animation when you click on button
  "--animation-input": "0.2s", // duration of animation for inputs like checkbox, toggle, radio, etc
  "--btn-text-case": "uppercase", // set default text transform for buttons
  "--btn-focus-scale": "0.95", // scale transform of button when you focus on it
  "--border-btn": "1px", // border width of buttons
  "--tab-border": "1px", // border width of tabs
  "--tab-radius": "0.5rem", // border radius of tabs
};

export default {
  content: ["./**/*.tsx"],
  theme: {
    // https://tailwindcss.com/docs/container#centering-by-default
    container: {
      center: true,
    },
    extend: {
      animation: {
        "slide-left": "slide-left-frame 0.4s ease normal",
        "slide-right": "slide-right-frame 0.4s ease normal",
        "slide-bottom": "slide-bottom-frame 0.4s ease normal",
        "progress": "progress-frame ease normal",
      },
      colors: {
        "pre-header": "#343434",
        "header": "#ff0045",
        "newsletter": "#343434", // shopping cart tem isso tambem
        "footer": "#454545",
        "light-gray": "#D3D3D3",
        "gray": "#555555",
        "medium-gray": "#727273",
        "gray-100": "#FFFFFF",
        "gray-400": "#777777",
        "gray-500": "#efefef",
        "default": "#ff0045",
        "text-color-primary": "#ff0045",
        "text-color-secord": "#666",
        "text-color-third": "#ed1e4a",
        "text-color-white": "#ffffff",
        "links-pre-header": "#b0b0b0",
      },
      fontFamily: {
        "firaSans": ["Fira Sans", "system-ui"],
        "Lato": ["Lato"],
      },
      plugins: {
        backdrop: {
          "&::backdrop": {
            background: "rgba(0, 0, 0, 0.5)",
          },
        },
        "scroll-snap-center": {
          "scroll-snap-align": "center",
        },
        "scroll-x-mandatory": {
          "scroll-snap-type": "x mandatory",
        },
        "snap-x": {
          "scroll-snap-type": "x var(--tw-scroll-snap-strictness)",
        },
        "snap-mandatory": {
          "--tw-scroll-snap-strictness": "mandatory",
        },
        "scrollbar-none": {
          "scrollbar-width": "none",
          "-ms-overflow-style": "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
        "details-arrow-none": {
          "&::-webkit-details-marker": {
            display: "none",
          },
        },
        "scrollbar-black": {
          "scrollbar-width": "auto",
          "scrollbar-color": "#030303 #ffffff",

          "&::-webkit-scrollbar": {
            "width": "10px",
            "height": "10px",
          },

          "&::-webkit-scrollbar-track": {
            "background": "#ffffff",
          },

          "&::-webkit-scrollbar-thumb": {
            "background-color": "#030303",
            "border-radius": "10px",
            "border": "3px solid #ffffff",
          },
        },
        "scrollbar-black-tranparent-y": {
          "scrollbar-width": "auto",
          "scrollbar-color": "#030303 ",

          "&::-webkit-scrollbar": {
            "width": "4px",
            "height": "0px",
          },

          "&::-webkit-scrollbar-thumb": {
            "background-color": "#030303",
            "border-radius": "10px",
          },
        },

        "scrollbar-black-tranparent-x": {
          "scrollbar-width": "auto",
          "scrollbar-color": "#030303 ",

          "&::-webkit-scrollbar": {
            "width": "0px",
            "height": "4px",
          },

          "&::-webkit-scrollbar-thumb": {
            "background-color": "#030303",
            "border-radius": "10px",
          },
        },
      },
      keyframes: {
        "slide-left-frame": {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(0)" },
        },
        "slide-right-frame": {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(0)" },
        },
        "slide-bottom-frame": {
          from: { transform: "translateY(100%)" },
          to: { transform: "translateY(0)" },
        },
        "progress-frame": {
          from: {
            "--dot-progress": "0%",
          },
          to: {
            "--dot-progress": "100%",
          },
        },
        "wiggle": {
          from: {
            "width": "0%",
          },
          to: {
            "width": "100%",
          },
        },
      },
    },
  },
};
