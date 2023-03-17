import React, { useContext } from "react";
import { FlatList, View } from "react-native";
import {
  SearchContext,
  CheckBoxContext,
  FavoritesContext,
} from "../context/context";

import SearchBar from "../components/SearchBar";
import RadioFilter from "../components/RadioFilter";
import Poster from "../components/Poster";

const Favorites: React.FC = () => {
  const [search, setSearch] = useContext(SearchContext);
  const [checkBox, setCheckBox] = useContext(CheckBoxContext);
  const [favorites] = useContext(FavoritesContext);

  return (
    <>
      <SearchBar setSearch={setSearch} search={search} />
      <RadioFilter setCheckBox={setCheckBox} checkBox={checkBox} />

      <FlatList
        initialNumToRender={12}
        numColumns={3}
        data={favorites
          .sort(
            (a, b) =>
              parseInt(b.Year.slice(0, 4)) - parseInt(a.Year.slice(0, 4))
          )
          .filter((w) => w.Title.toLowerCase().includes(search))
          .filter((w) => w.Type === checkBox || checkBox === "All")}
        keyExtractor={(watched) => watched.imdbID}
        renderItem={({ item }) => {
          return <Poster data={item} />;
        }}
      />
    </>
  );
};

export default Favorites;
