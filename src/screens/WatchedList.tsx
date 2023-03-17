import React, { useContext, useEffect, useState, lazy } from "react";
import { View, FlatList } from "react-native";
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
      {/* <ScrollView contentContainerStyle={styles.flexRow}>
        {watched
          .sort(
            (a, b) =>
              parseInt(b.Year.slice(0, 4)) - parseInt(a.Year.slice(0, 4))
          )
          .filter((w) => w.Title.includes(search))
          ?.map((data: TVPROPS, index: number) => (
            <React.Suspense
              fallback={<Text>Loading...</Text>}
              key={data.imdbID}
            >
              <PosterComponent key={data.imdbID + index} data={data} />
            </React.Suspense>
          ))}
      </ScrollView> */}
      <FlatList
        initialNumToRender={12}
        numColumns={3}
        data={watched
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

export default WatchedList;
