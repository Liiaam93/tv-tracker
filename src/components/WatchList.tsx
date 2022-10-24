import React, { useContext } from "react";
import { View, Button } from "react-native";
import { RootStackParamList, TVPROPS } from "../../types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  SearchContext,
  WatchListContext,
  CheckBoxContext,
} from "../context/context";
import SearchBar from "./SearchBar";
import RadioFilter from "./RadioFilter";
import { ScrollView } from "react-native-gesture-handler";
import Poster from "./Poster";
import { styles } from "../styles/styles";

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, "WatchList">;

const WatchList: React.FC<HomeScreenProps> = (props) => {
  const [search, setSearch] = useContext(SearchContext);
  const [watched] = useContext(WatchListContext);
  const [checkBox, setCheckBox] = useContext(CheckBoxContext);

  return (
    <>
      <View style={styles.navButtons}>
        <View
          style={{
            width: "48%",
            marginHorizontal: 3,
          }}
        >
          <Button
            title="Back to Search"
            onPress={() => {
              props.navigation.navigate("Home");
              setSearch("");
            }}
          />
        </View>
        <View style={{ width: "48%", marginHorizontal: 3 }}>
          <Button
            title="View Favorites"
            onPress={() => {
              props.navigation.navigate("Favorites");
              setSearch("");
            }}
          />
        </View>
      </View>
      <SearchBar setSearch={setSearch} search={search} />
      <RadioFilter setCheckBox={setCheckBox} checkBox={checkBox} />
      <ScrollView contentContainerStyle={styles.flexRow}>
        {watched
          ?.filter((w) => w.Title.includes(search))
          .sort(
            (a, b) =>
              parseInt(b.Year.slice(0, 3)) - parseInt(a.Year.slice(0, 3))
          )
          .map((data: TVPROPS, index: number) => (
            <Poster key={index} data={data} />
          ))}
      </ScrollView>
    </>
  );
};

export default WatchList;
