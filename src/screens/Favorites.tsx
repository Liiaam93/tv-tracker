import React, { useContext } from "react";
import { View } from "react-native";
import { TVPROPS } from "../../types";
import {
  SearchContext,
  CheckBoxContext,
  FavoritesContext,
} from "../context/context";

import SearchBar from "../components/SearchBar";
import RadioFilter from "../components/RadioFilter";
import { ScrollView } from "react-native-gesture-handler";
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
      <ScrollView contentContainerStyle={styles.flexRow}>
        {favorites
          ?.filter((w) => w.Title.includes(search))
          .sort(
            (a, b) =>
              parseInt(b.Year.slice(0, 4)) - parseInt(a.Year.slice(0, 4))
          )
          .map((data: TVPROPS, index: number) => (
            <Poster key={index} data={data} />
          ))}
      </ScrollView>
    </>
  );
};

export default Favorites;
