import React, { useState } from "react";
import { Button, Image, Modal, Pressable, Text, View } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TVPROPS } from "../../types";
import { styles } from "../styles/styles";
import PosterModal from "./PosterModal";

const API_KEY = "8ecf88bb"; // OMDb API Key

type Props = {
  data: TVPROPS;
  watched?: TVPROPS[];
  setWatched: (value: TVPROPS[]) => void;
  saveToLocalStorage: (items: TVPROPS[]) => Promise<void>;
  checkBox: string;
  handleWatched?: any;
};

const Poster = ({
  data,
  watched,
  setWatched,
  saveToLocalStorage,
  handleWatched,
  checkBox,
}: Props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [TVInfo, setTVInfo] = useState<any>();

  const handleClick = async () => {
    const response = await axios(
      `https://www.omdbapi.com/?apikey=${API_KEY}&i=${data.imdbID}`
    );
    const info = response.data;
    setTVInfo(info);
    setModalVisible(true);
  };

  // const handleWatched = async () => {
  //   if (watched.includes(data)) {
  //     setWatched(
  //       watched.filter((favourite) => favourite.imdbID !== data.imdbID)
  //     );
  //     await AsyncStorage.setItem("react-watched", JSON.stringify(watched));
  //     saveToLocalStorage(watched);
  //   } else {
  //     setWatched([data, ...watched]);
  //     await AsyncStorage.setItem("react-watched", JSON.stringify(watched));
  //     saveToLocalStorage(watched);
  //   }
  // };

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
          <Button
            title={
              watched?.some((w) => w.imdbID === data.imdbID) ? "Remove" : "Add"
            }
            onPress={() => handleWatched(data)}
          ></Button>
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
