import { useState } from "react";
import { Switch, Route, NavLink } from "react-router-dom";
import Movie from "./components/Movie";
import FavMovie from "./components/FavMovie";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  SONRAKI_FILM,
  REMOVE_FAV,
  ONCEKI_FILM,
  ADD_FAVORITES,
} from "./actions/actions";

function App() {
  const dispatch = useDispatch();
  const favMovies = useSelector((store) => store.favorites);
  const sira = useSelector((store) => store.sira);
  const movies = useSelector((store) => store.movies);

  function sonrakiFilm() {
    dispatch({ type: SONRAKI_FILM });
  }

  function oncekiFilm() {
    dispatch({ type: ONCEKI_FILM });
  }
  function addToFav() {
    dispatch({ type: ADD_FAVORITES, payload: movies[sira] });
  }

  return (
    <div className="wrapper max-w-2xl mx-auto">
      <nav className="flex text-2xl pb-6 pt-8 gap-2 justify-center">
        <NavLink
          to="/"
          exact
          className="py-3 px-6 "
          activeClassName="bg-white shadow-sm text-blue-600"
        >
          Filmler
        </NavLink>
        <NavLink
          to="/listem"
          className="py-3 px-6 "
          activeClassName="bg-white shadow-sm text-blue-600"
        >
          Listem
        </NavLink>
      </nav>
      <Switch>
        <Route exact path="/">
          <Movie />

          <div className="flex gap-3 justify-end py-3">
            {sira > 0 && (
              <button
                onClick={oncekiFilm}
                className="select-none px-4 py-2 border border-blue-700 text-blue-700 hover:border-blue-500 hover:text-blue-500"
              >
                Önceki
              </button>
            )}
            {sira + 1 < movies.length && (
              <button
                onClick={sonrakiFilm}
                className="select-none px-4 py-2 border border-blue-700 text-blue-700 hover:border-blue-500 hover:text-blue-500"
              >
                Sıradaki
              </button>
            )}
            <button
              onClick={addToFav}
              className="select-none px-4 py-2 bg-blue-700 hover:bg-blue-600 text-white"
            >
              Listeme ekle
            </button>
          </div>
        </Route>

        <Route path="/listem">
          <div>
            {favMovies.map((movie) => (
              <FavMovie key={movie.id} title={movie.title} id={movie.id} />
            ))}
          </div>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
