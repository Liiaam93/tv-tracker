import React from "react";
import { Image, Modal, Pressable, Text, View } from "react-native";
import { styles } from "../styles/styles";

type Props = {
  modalVisible: boolean;
  setModalVisible: (input: boolean) => void;
  TVInfo: any;
};
const PosterModal = ({ modalVisible, setModalVisible, TVInfo }: Props) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>{TVInfo?.Title}</Text>
        <Text>{`(${TVInfo?.Year})`}</Text>
        <Image source={{ uri: TVInfo?.Poster }} style={styles.modalImage} />
        <Text>Rating: {TVInfo?.Rated}</Text>
        <Text>Genre: {TVInfo?.Genre}</Text>
        <Text>Language: {TVInfo?.Language}</Text>
        <Text style={styles.modalPlot}>{TVInfo?.Plot}</Text>
        <Text>Metascore: {TVInfo?.Metascore}</Text>
        {TVInfo?.Ratings.map((e: any, index: number) => (
          <Text key={index}>
            {e.Source} : {e.Value}
          </Text>
        ))}

        <Pressable style={{}} onPress={() => setModalVisible(!modalVisible)}>
          <Text style={styles.modalButton}>Close</Text>
        </Pressable>
      </View>
    </Modal>
  );
};

export default PosterModal;
