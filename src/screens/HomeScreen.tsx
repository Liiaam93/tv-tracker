import React, { useContext } from "react";
import { View } from "react-native";
import { TVPROPS } from "../../types";
import {
  TVDataContext,
  SearchContext,
  CheckBoxContext,
} from "../context/context";
import SearchBar from "../components/SearchBar";
import axios from "axios";
import RadioFilter from "../components/RadioFilter";
import { ScrollView } from "react-native-gesture-handler";
import Poster from "../components/Poster";
import { styles } from "../styles/styles";
import { Keyboard } from "react-native";
import Intro from "../components/Intro";

const API_KEY = "8ecf88bb"; // OMDb API Key

const HomeScreen: React.FC = () => {
  const [tvData, setTVData] = useContext(TVDataContext);
  const [search, setSearch] = useContext(SearchContext);
  const [checkBox, setCheckBox] = useContext(CheckBoxContext);

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
    Keyboard.dismiss();
  };

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
      <SearchBar
        setSearch={setSearch}
        handleSearch={handleSearch}
        search={search}
      />
      <RadioFilter setCheckBox={setCheckBox} checkBox={checkBox} />
      {tvData.length < 1 && <Intro />}
      <ScrollView contentContainerStyle={styles.flexRow}>
        {tvData.map((data: TVPROPS, index: number) => (
          <Poster key={index} data={data} />
        ))}
      </ScrollView>
    </>
  );
};

export default HomeScreen;
