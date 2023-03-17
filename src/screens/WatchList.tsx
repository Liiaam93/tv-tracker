import React, { useContext, lazy } from "react";
import { TVPROPS } from "../../types";
import {
  SearchContext,
  WatchListContext,
  CheckBoxContext,
} from "../context/context";
import SearchBar from "../components/SearchBar";
import RadioFilter from "../components/RadioFilter";
import { ScrollView } from "react-native-gesture-handler";
import Poster from "../components/Poster";

import { styles } from "../styles/styles";
import { FlatList } from "react-native";

const WatchList: React.FC = () => {
  const [search, setSearch] = useContext(SearchContext);
  const [watchList] = useContext(WatchListContext);
  const [checkBox, setCheckBox] = useContext(CheckBoxContext);

  return (
    <>
      <SearchBar setSearch={setSearch} search={search} />
      <RadioFilter setCheckBox={setCheckBox} checkBox={checkBox} />

      <FlatList
        initialNumToRender={12}
        numColumns={3}
        data={watchList
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

export default WatchList;
