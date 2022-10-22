import React, { useContext } from "react";
import { Button, View } from "react-native";
import { RootStackParamList, TVPROPS } from "../../types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  SearchContext,
  CheckBoxContext,
  FavoritesContext,
} from "../context/context";

import SearchBar from "./SearchBar";
import RadioFilter from "./RadioFilter";
import { ScrollView } from "react-native-gesture-handler";
import Poster from "./Poster";
import { styles } from "../styles/styles";

type FavoriteScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Favorites"
>;

const Favorites: React.FC<FavoriteScreenProps> = (props) => {
  const [search, setSearch] = useContext(SearchContext);
  const [checkBox, setCheckBox] = useContext(CheckBoxContext);
  const [favorites] = useContext(FavoritesContext);

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
            title="Go back to Search"
            onPress={() => {
              props.navigation.navigate("Home");
              setSearch("");
            }}
          />
        </View>
        <View style={{ width: "48%", marginHorizontal: 3 }}>
          <Button
            title="View Watch List"
            onPress={() => {
              props.navigation.navigate("WatchedList");
              setSearch("");
            }}
          />
        </View>
      </View>
      <SearchBar setSearch={setSearch} search={search} />
      <RadioFilter setCheckBox={setCheckBox} checkBox={checkBox} />
      <ScrollView contentContainerStyle={styles.flexRow}>
        {favorites
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

export default Favorites;
