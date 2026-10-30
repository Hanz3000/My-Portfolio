"use client";

import * as React from "react";

type Theme = "light" | "dark";

type ThemeProviderProps = {
  children: React.ReactNode;
  attribute?: "class";
  defaultTheme?: Theme;
  storageKey?: string;
  disableTransitionOnChange?: boolean;
};

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = React.createContext<ThemeContextValue | undefined>(
  undefined
);

const themeChangeEvent = "portfolio-theme-change";

function readTheme(storageKey: string, defaultTheme: Theme): Theme {
  try {
    const savedTheme = window.localStorage.getItem(storageKey);
    return savedTheme === "light" || savedTheme === "dark"
      ? savedTheme
      : defaultTheme;
  } catch (error) {
    console.error("Unable to read the saved theme.", error);
    return defaultTheme;
  }
}

function applyTheme(theme: Theme, attribute: "class") {
  if (attribute === "class") {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }
  document.documentElement.style.colorScheme = theme;
}

export function ThemeProvider({
  children,
  attribute = "class",
  defaultTheme = "dark",
  storageKey = "theme",
  disableTransitionOnChange = false,
}: ThemeProviderProps) {
  const subscribe = React.useCallback(
    (callback: () => void) => {
      const handleStorage = (event: StorageEvent) => {
        if (event.key === storageKey) callback();
      };
      window.addEventListener("storage", handleStorage);
      window.addEventListener(themeChangeEvent, callback);
      return () => {
        window.removeEventListener("storage", handleStorage);
        window.removeEventListener(themeChangeEvent, callback);
      };
    },
    [storageKey]
  );
  const getSnapshot = React.useCallback(
    () => readTheme(storageKey, defaultTheme),
    [defaultTheme, storageKey]
  );
  const getServerSnapshot = React.useCallback(
    () => defaultTheme,
    [defaultTheme]
  );
  const theme = React.useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  React.useEffect(() => {
    applyTheme(theme, attribute);
  }, [attribute, theme]);

  const setTheme = React.useCallback(
    (nextTheme: Theme) => {
      let removeTransitionStyle: (() => void) | undefined;
      if (disableTransitionOnChange && nextTheme !== theme) {
        const style = document.createElement("style");
        style.appendChild(
          document.createTextNode(
            "*{transition:none!important;-webkit-transition:none!important}"
          )
        );
        document.head.appendChild(style);
        window.getComputedStyle(document.body);
        removeTransitionStyle = () => {
          window.setTimeout(() => style.remove(), 1);
        };
      }

      applyTheme(nextTheme, attribute);
      try {
        window.localStorage.setItem(storageKey, nextTheme);
      } catch (error) {
        console.error("Unable to save the selected theme.", error);
      }
      window.dispatchEvent(new Event(themeChangeEvent));
      removeTransitionStyle?.();
    },
    [attribute, disableTransitionOnChange, storageKey, theme]
  );

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
