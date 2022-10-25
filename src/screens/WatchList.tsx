import React, { useContext } from "react";
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

const WatchList: React.FC = () => {
  const [search, setSearch] = useContext(SearchContext);
  const [watchList] = useContext(WatchListContext);
  const [checkBox, setCheckBox] = useContext(CheckBoxContext);

  return (
    <>
      <SearchBar setSearch={setSearch} search={search} />
      <RadioFilter setCheckBox={setCheckBox} checkBox={checkBox} />
      <ScrollView contentContainerStyle={styles.flexRow}>
        {watchList
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

export default WatchList;
