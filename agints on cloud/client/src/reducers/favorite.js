const initialState = { favorite: [] };

const favoriteReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_FAVORITE":
      return { favorite: payload };
    case "ADD_FAVORITE":
      return { favorite: [...state.favorite, payload] };

    case "DELETE_FAVORITE":
      return state.favorite.filter((ele, i) => {
        console.log("payload", payload);
        return ele.id !== payload;
      });

    default:
      return state;
  }
};

export default favoriteReducer;

export const setFavorite = (favorite) => {
  return { type: "SET_FAVORITE", payload: favorite };
};
export const AddFavorite = (newFavorite) => {
  return { type: "ADD_FAVORITE", payload: newFavorite };
};
export const deleteFavorite = (deleteFavorite) => {
  console.log("deleteFavorite", deleteFavorite);
  return { type: "DELETE_FAVORITE", payload: deleteFavorite };
};
