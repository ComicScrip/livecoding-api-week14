import React from "react";
import themes from "../themes";

export const ThemeSwitcher = ({
  currentTheme = themes['light'],
  currentThemeName = 'light',
  changeThemeToLight = () => {},
  changeThemeToDark = () => {}
}) => (
  <button
    style={{ color: currentTheme.foreground }}
    onClick={
      currentThemeName === "dark" ? changeThemeToLight : changeThemeToDark
    }
  >
    Switch to {currentThemeName === "dark" ? "light" : "dark"} theme
  </button>
);

export default ThemeSwitcher;
