export const searchReducer = (state = { text: "some text" }, action) => {
  switch (action.type) {
    case "SEARCH":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
