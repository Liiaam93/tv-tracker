import React from "react";
import { Text, View } from "react-native";
import { RadioButton } from "react-native-paper";
import { styles } from "../styles/styles";

type Props = {
  checkBox: string;
  setCheckBox: (value: string) => void;
};
const RadioFilter: React.FC<Props> = ({ checkBox, setCheckBox }) => {
  return (
    <View style={styles.flexRow}>
      <View style={styles.radioButton}>
        <Text style={styles.whiteText}>All</Text>
        <RadioButton
          color="white"
          uncheckedColor="white"
          value="All"
          status={checkBox === "All" ? "checked" : "unchecked"}
          onPress={() => setCheckBox("All")}
        />
      </View>
      <View style={styles.radioButton}>
        <Text style={styles.whiteText}>Movie</Text>
        <RadioButton
          color="white"
          uncheckedColor="white"
          value="movie"
          status={checkBox === "movie" ? "checked" : "unchecked"}
          onPress={() => setCheckBox("movie")}
        />
      </View>
      <View style={styles.radioButton}>
        <Text style={styles.whiteText}>TV</Text>
        <RadioButton
          value="series"
          uncheckedColor="white"
          color="white"
          status={checkBox === "series" ? "checked" : "unchecked"}
          onPress={() => setCheckBox("series")}
        />
      </View>
      <View style={styles.radioButton}>
        <Text style={styles.whiteText}>Game</Text>
        <RadioButton
          value="game"
          uncheckedColor="white"
          color="white"
          status={checkBox === "game" ? "checked" : "unchecked"}
          onPress={() => setCheckBox("game")}
        />
      </View>
    </View>
  );
};

export default RadioFilter;
