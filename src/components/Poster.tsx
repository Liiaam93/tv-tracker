import React, { useContext, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TVPROPS } from "../../types";
import { styles } from "../styles/styles";
import PosterModal from "./PosterModal";
import {
  CheckBoxContext,
  FavoritesContext,
  WatchListContext,
} from "../context/context";
import Ionicons from "@expo/vector-icons/Ionicons";

const API_KEY = "8ecf88bb"; // OMDb API Key

type Props = {
  data: TVPROPS;
};
const saveToLocalStorage = async (items: TVPROPS[]) => {
  await AsyncStorage.setItem("react-watched", JSON.stringify(items));
};

const saveToFavorites = async (items: TVPROPS[]) => {
  await AsyncStorage.setItem("react-favorites", JSON.stringify(items));
};

const Poster = ({ data }: Props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [TVInfo, setTVInfo] = useState<any>();
  const [watched, setWatched] = useContext(WatchListContext);
  const [favorites, setFavorites] = useContext(FavoritesContext);
  const [checkBox] = useContext(CheckBoxContext);

  const handleWatched = async (data: TVPROPS) => {
    if (watched.includes(data)) {
      setWatched(
        watched.filter((favourite) => favourite.imdbID !== data.imdbID)
      );
      await AsyncStorage.setItem("react-watched", JSON.stringify(watched));
      saveToLocalStorage(watched);
    } else {
      setWatched([data, ...watched]);
      await AsyncStorage.setItem("react-watched", JSON.stringify(watched));
      saveToLocalStorage(watched);
    }
  };

  const handleFavorite = async (data: TVPROPS) => {
    if (favorites.includes(data)) {
      setFavorites(
        favorites.filter((favourite) => favourite.imdbID !== data.imdbID)
      );
      await AsyncStorage.setItem("react-favorites", JSON.stringify(favorites));
      saveToFavorites(favorites);
    } else {
      setFavorites([data, ...favorites]);
      await AsyncStorage.setItem("react-favorites", JSON.stringify(favorites));
      saveToFavorites(favorites);
    }
  };
  const handleClick = async () => {
    const response = await axios(
      `https://www.omdbapi.com/?apikey=${API_KEY}&i=${data.imdbID}`
    );
    const info = response.data;
    setTVInfo(info);
    setModalVisible(true);
  };

  return (
    <>
      {checkBox === "All" || checkBox === data.Type ? (
        <Pressable style={styles.posterContainer} onPress={() => handleClick()}>
          <Text style={styles.whiteText}>{data?.Year}</Text>
          <View style={styles.posterImageContainer}>
            <Image
              source={{
                uri:
                  data?.Poster !== "N/A"
                    ? data.Poster
                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIpiWEfPLgvC7emCIJ1CYHHI1-RWJ_5XbJQg&usqp=CAU",
              }}
              style={[
                styles.posterImage,
                { height: data.Type !== "game" ? 150 : 100 },
              ]}
            />
          </View>
          <Text style={styles.posterText}>{data?.Title}</Text>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Ionicons.Button
              backgroundColor={"slategrey"}
              onPress={() => handleWatched(data)}
              name={
                watched?.some((w) => w.imdbID === data.imdbID)
                  ? "eye"
                  : "eye-off"
              }
              size={32}
              color="white"
            />
            <Ionicons.Button
              backgroundColor={"slategrey"}
              onPress={() => handleFavorite(data)}
              name={
                favorites?.some((w) => w.imdbID === data.imdbID)
                  ? "heart"
                  : "heart-outline"
              }
              size={32}
              color="white"
            />
          </View>
        </Pressable>
      ) : (
        ""
      )}
      <PosterModal
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        TVInfo={TVInfo}
      />
    </>
  );
};

export default Poster;
