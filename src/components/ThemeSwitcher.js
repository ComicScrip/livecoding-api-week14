import React from "react";
import { connect } from "react-redux";
import themes from "../themes";
import { changeTheme } from "../redux/ui-settings";

export const ThemeSwitcher = ({
  currentTheme,
  currentThemeName,
  changeThemeToLight,
  changeThemeToDark
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

const mapStateToProps = ({ UISettings: { themeName } }) => ({
  currentThemeName: themeName,
  currentTheme: themes[themeName]
});
const mapDispatchToProps = dispatch => ({
  changeThemeToDark: () => dispatch(changeTheme("dark")),
  changeThemeToLight: () => dispatch(changeTheme("light"))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ThemeSwitcher);
