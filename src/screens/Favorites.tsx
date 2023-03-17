import React, { useContext, lazy } from "react";
import { FlatList, View } from "react-native";
import { TVPROPS } from "../../types";
import {
  SearchContext,
  CheckBoxContext,
  FavoritesContext,
} from "../context/context";

import SearchBar from "../components/SearchBar";
import RadioFilter from "../components/RadioFilter";
import Poster from "../components/Poster";

import { styles } from "../styles/styles";

const Favorites: React.FC = () => {
  const [search, setSearch] = useContext(SearchContext);
  const [checkBox, setCheckBox] = useContext(CheckBoxContext);
  const [favorites] = useContext(FavoritesContext);

  return (
    <>
      <View style={styles.navButtons}></View>
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
          .filter((w) => w.Title.includes(search))
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
