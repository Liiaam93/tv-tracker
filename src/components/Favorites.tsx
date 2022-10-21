import React, { useContext } from "react";
import { Button } from "react-native";
import { RootStackParamList, TVPROPS } from "../../types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  TVDataContext,
  SearchContext,
  WatchListContext,
  CheckBoxContext,
  FavoritesContext,
} from "../context/context";
import SearchBar from "./SearchBar";
import axios from "axios";
import RadioFilter from "./RadioFilter";
import { ScrollView } from "react-native-gesture-handler";
import Poster from "./Poster";
import { styles } from "../styles/styles";

const API_KEY = "8ecf88bb"; // OMDb API Key

type FavoriteScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Favorites"
>;

const saveToLocalStorage = async (items: TVPROPS[]) => {
  await AsyncStorage.setItem("react-favorites", JSON.stringify(items));
};

const Favorites: React.FC<FavoriteScreenProps> = (props) => {
  const [tvData, setTVData] = useContext(TVDataContext);
  const [search, setSearch] = useContext(SearchContext);
  const [watched, setWatched] = useContext(WatchListContext);
  const [checkBox, setCheckBox] = useContext(CheckBoxContext);
  const [favorites, setFavorites] = useContext(FavoritesContext);

  return (
    <>
      <Button
        title="Go back to search"
        onPress={() => props.navigation.navigate("Home")}
      />
      <SearchBar setSearch={setSearch} search={search} />
      <RadioFilter setCheckBox={setCheckBox} checkBox={checkBox} />
      <ScrollView contentContainerStyle={styles.flexRow}>
        {favorites
          ?.filter((w) => w.Title.includes(search))
          .map((data: TVPROPS, index: number) => (
            <Poster
              key={index}
              data={data}
              watched={watched}
              setWatched={setWatched}
              saveToLocalStorage={saveToLocalStorage}
              checkBox={checkBox}
            />
          ))}
      </ScrollView>
    </>
  );
};

export default Favorites;
