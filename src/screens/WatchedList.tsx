import React, { useContext } from "react";
import { View } from "react-native";
import { TVPROPS } from "../../types";
import {
  SearchContext,
  WatchedListContext,
  CheckBoxContext,
} from "../context/context";
import SearchBar from "../components/SearchBar";
import RadioFilter from "../components/RadioFilter";
import { ScrollView } from "react-native-gesture-handler";
import Poster from "../components/Poster";
import { styles } from "../styles/styles";

const WatchedList: React.FC = () => {
  const [search, setSearch] = useContext(SearchContext);
  const [watched] = useContext(WatchedListContext);
  const [checkBox, setCheckBox] = useContext(CheckBoxContext);

  return (
    <>
      <View style={styles.navButtons}>
        <View
          style={{
            width: "48%",
            marginHorizontal: 3,
          }}
        ></View>
      </View>
      <SearchBar setSearch={setSearch} search={search} />
      <RadioFilter setCheckBox={setCheckBox} checkBox={checkBox} />
      <ScrollView contentContainerStyle={styles.flexRow}>
        {watched
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

export default WatchedList;
