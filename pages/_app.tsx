import CustomConnectButton from "@/components/CustomConnectButton";
import { useInitTheme } from "@/hooks/useInitTheme";
import { lightTheme, darkTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import resolveConfig from "tailwindcss/resolveConfig";
import { WagmiConfig } from "wagmi";
import { chains, wagmiClient } from "../configs/wallet";
import "../styles/globals.css";
import tailwindConfig from "../tailwind.config.js";
import Navbar from "@/components/Navbar";
import ThemeToggle from "@/components/ThemeToggle";
import { useEffect, useState } from "react";
import { applyThemeProperties } from "../utils/applyThemeProperties";

const fullConfig = resolveConfig(tailwindConfig);

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [themeConfig, setThemeConfig] = useState<any>(lightTheme());

  useEffect(() => {
    if (typeof window === "undefined") return; // Ensure this runs only in the browser

    // Initialize theme based on saved preference or system preference
    const savedTheme = localStorage.getItem("theme");
    const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialMode = savedTheme ? savedTheme === "dark" : prefersDarkMode;
    setIsDarkMode(initialMode);
    applyThemeProperties(initialMode); // Apply your CSS variables
    document.documentElement.classList.toggle("dark", initialMode);

    // Dynamically map your Tailwind `skin` colors to RainbowKit themes
    const getCSSVariable = (variableName: string): string => {
      return getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();
    };

    const config = initialMode
      ? darkTheme({
        accentColor: getCSSVariable("--color-button-accent") || "#C70039", // Default fallback
        accentColorForeground: getCSSVariable("--color-text-inverted") || "#FFFFFF",
      })
      : lightTheme({
        accentColor: getCSSVariable("--color-button-accent") || "#FF5733", // Default fallback
        accentColorForeground: getCSSVariable("--color-text-base") || "#000000",
      });

    setThemeConfig(config);
  }, []);

  return (
    <SWRConfig
      value={{
        fetcher: (resource, init) =>
          fetch(resource, init).then((res) => res.json()),
      }}
    >
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains} theme={themeConfig}>
          <div className="bg-skin-fill text-skin-base dark:bg-skin-backdrop dark:text-skin-inverted h-screen flex">
            <Navbar />
            <div id="internal-body" className="flex flex-col p-4 flex-grow h-full overflow-y-auto overflow-x-hidden">
              <div className="w-full pb-0 md:pb-4 flex justify-between gap-8">
                <div className="flex items-center gap-4 ml-auto">
                  <CustomConnectButton className="px-6 h-10 rounded-xl border border-skin-stroke transition ease-in-out hover:scale-110 text-sm whitespace-nowrap lg:text-lg" />
                  <ThemeToggle />
                </div>
              </div>
              <Component {...pageProps} />
            </div>
          </div>
        </RainbowKitProvider>
      </WagmiConfig>
    </SWRConfig>
  );
};

export default MyApp;
