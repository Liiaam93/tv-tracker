import React, { useContext } from "react";
import { View, Button } from "react-native";
import { RootStackParamList, TVPROPS } from "../../types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  TVDataContext,
  SearchContext,
  CheckBoxContext,
} from "../context/context";
import SearchBar from "./SearchBar";
import axios from "axios";
import RadioFilter from "./RadioFilter";
import { ScrollView } from "react-native-gesture-handler";
import Poster from "./Poster";
import { styles } from "../styles/styles";

const API_KEY = "8ecf88bb"; // OMDb API Key

// type HomeScreenProps = NativeStackScreenProps<RootStackParamList, "Home">;

const HomeScreen: React.FC = () => {
  const [tvData, setTVData] = useContext(TVDataContext);
  const [search, setSearch] = useContext(SearchContext);
  const [checkBox, setCheckBox] = useContext(CheckBoxContext);

  const handleKeyDown = (e: any) => {
    if (e.nativeEvent.key == "Enter") {
      handleSearch ? handleSearch(search) : "";
    }
  };

  const handleSearch = async (searchInput: string) => {
    let type: string = "";
    if (checkBox === "All") {
      type = "";
    } else {
      type = `&type=${checkBox}`;
    }
    const urls = [
      `https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchInput.trim()}${type}`,
      `https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchInput.trim()}&page=2${type}`,
      `https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchInput.trim()}&page=3${type}`,
    ];

    const data = await Promise.all(
      urls.map(async (url) => {
        const resp = await axios(url);
        const dat = resp.data;
        return dat.Search;
      })
    );

    const flatData = data.flat(1);
    const tvd = flatData.filter((e) => e !== undefined);
    setTVData(tvd);
  };

  return (
    <>
      <View style={styles.navButtons}>
        <View
          style={{
            width: "48%",
            marginHorizontal: 3,
          }}
        >
          {/* <Button
            title="View Watch List"
            onPress={() => {
              props.navigation.navigate("Seen");
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
          /> */}
        </View>
      </View>
      <SearchBar
        setSearch={setSearch}
        handleSearch={handleSearch}
        search={search}
      />
      <RadioFilter setCheckBox={setCheckBox} checkBox={checkBox} />
      <ScrollView contentContainerStyle={styles.flexRow}>
        {tvData.map((data: TVPROPS, index: number) => (
          <Poster key={index} data={data} />
        ))}
      </ScrollView>
    </>
  );
};

export default HomeScreen;
