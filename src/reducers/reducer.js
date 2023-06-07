import { movies } from "../movies";
import {
  REMOVE_FAV,
  ADD_FAVORITES,
  SONRAKI_FILM,
  ONCEKI_FILM,
} from "../actions/actions";

const initialState = {
  movies: movies,
  favorites: [],
  sira: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FAVORITES:
      const addToFavMovie = action.payload;
      const newMovieList = state.movies.filter(
        (m) => m.id !== addToFavMovie.id
      );

      return {
        ...state,
        favorites: [...state.favorites, addToFavMovie],
        movies: newMovieList,
        sira: state.sira === newMovieList.length ? state.sira - 1 : state.sira,
      };
    case REMOVE_FAV:
      const fav2RemoveID = action.payload;
      const newFavList = state.favorites.filter((f) => f.id !== fav2RemoveID);
      const fav2Move2Movies = state.favorites.find(
        (f) => f.id === fav2RemoveID
      );
      const movList2Add = [...state.movies, fav2Move2Movies];
      return {
        ...state,
        favorites: newFavList,
        movies: movList2Add,
      };

    case SONRAKI_FILM:
      return {
        ...state,
        sira: state.sira + 1,
      };

    case ONCEKI_FILM:
      return {
        ...state,
        sira: state.sira - 1,
      };

    default:
      return state;
  }
};

export default reducer;
