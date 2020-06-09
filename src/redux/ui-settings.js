export const initialUISettingsState = {
  themeName: "light"
};

export const changeTheme = newTheme => ({
  type: "CHANGE_THEME",
  newTheme
});

const UISettingsReducer = (state = initialUISettingsState, action) => {
  switch (action.type) {
    case "CHANGE_THEME":
      return { ...state, themeName: action.newTheme };
    default:
      return state;
  }
};

export default UISettingsReducer;
