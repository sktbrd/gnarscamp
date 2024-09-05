import { ThemeConfig } from "types/ThemeConfig";
import { darkTheme, lightTheme } from "theme/default";
import merge from "lodash.merge";

export const theme: ThemeConfig = merge(lightTheme, {
  styles: {
    fonts: {
      heading: "Londrina Solid",
      nouns: "Londrina Solid",
      body: "Londrina Solid"
    },
    colors: {
      muted: `255, 255, 255`, // white background
      backdrop: `255, 255, 255`, // white background
      fill: `255, 255, 255`, // black text
      stroke: `251, 177, 70`, // orange stroke
      "text-base": `0 , 0 , 0 `,
      "text-muted": `0 , 0 , 0 `,
      "text-inverted": `0 , 0 , 0 `,
      "text-highlighted": `251, 177, 70`,
      "text-pink": `216, 17, 89`,
      "button-accent": `33, 131, 128`,
      "button-accent-hover": `251, 177, 60`,
      "button-muted": `143, 45, 86`,
      "proposal-success": `141, 224, 58`,
      "proposal-danger": `232, 46, 59`,
      "proposal-muted": `216, 17, 89`,
      "proposal-highlighted": `251, 177, 70`,
    }
  },
  nav: {
    primary: [
      { label: "NounsBr", href: "https://NounsBr.com" },
      { label: "About", href: "/about" },
      { label: "Proposals", href: "/vote" },
    ],
    secondary: [
    ],
  },
  brand: {
    title: "NounsBr",
    logo: "https://nounsbr.wtf/static/media/logo.701015cd.svg",
  },

} as Partial<ThemeConfig>);
