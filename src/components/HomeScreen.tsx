import React, { useContext } from "react";
import { View, Text } from "react-native";
import { TVPROPS } from "../../types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
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
import { Keyboard } from "react-native";

const API_KEY = "8ecf88bb"; // OMDb API Key

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
      {tvData.length < 1 && (
        <View
          style={[
            styles.modalPlot,
            {
              alignItems: "center",
              alignContent: "center",
              margin: 10,
              backgroundColor: "slategrey",
              minHeight: "70%",
            },
          ]}
        >
          <Text style={{ fontWeight: "600", fontSize: 24, margin: 20 }}>
            How to use
          </Text>
          <Text style={{ fontSize: 20, marginTop: 15 }}>
            <MaterialCommunityIcons name="magnify" size={24} color="black" />
            Search
          </Text>
          <Text style={styles.whiteText}>
            Search for a movie, tv show or a game...
          </Text>
          <Text style={{ fontSize: 20, marginTop: 15 }}>
            <MaterialCommunityIcons name="eye" size={24} color="black" /> Seen
          </Text>
          <Text style={styles.whiteText}>
            Stuff you've seen! Mark things using the 'eye' icon.
          </Text>
          <Text style={{ fontSize: 20, marginTop: 15 }}>
            <MaterialCommunityIcons
              name="heart-outline"
              size={24}
              color="black"
            />{" "}
            Favorites
          </Text>
          <Text style={styles.whiteText}>
            What do you think this is for??? Use the heart icon dummy
          </Text>
          <Text style={{ fontSize: 20, marginTop: 15 }}>
            <MaterialCommunityIcons name="history" size={24} color="black" />{" "}
            Watch List
          </Text>
          <Text style={styles.whiteText}>
            Stuff you haven't watched yet, but want to!
          </Text>
          <Text style={{ fontSize: 20, marginTop: 15 }}>Filters</Text>
          <Text style={styles.whiteText}>
            Use the filters on any page to narrow down your search!
          </Text>
        </View>
      )}
      <ScrollView contentContainerStyle={styles.flexRow}>
        {tvData.map((data: TVPROPS, index: number) => (
          <Poster key={index} data={data} />
        ))}
      </ScrollView>
    </>
  );
};

export default HomeScreen;
