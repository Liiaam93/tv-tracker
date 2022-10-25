import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, Text } from "react-native";

import { styles } from "../styles/styles";

const Intro = () => {
  return (
    <View style={[styles.intro]}>
      <Text style={{ fontWeight: "600", fontSize: 24, margin: 20 }}>
        How to use
      </Text>
      <Text style={styles.introText}>
        <MaterialCommunityIcons name="magnify" size={24} color="black" />
        Search
      </Text>
      <Text style={styles.whiteText}>
        Search for a movie, tv show or a game...
      </Text>
      <Text style={styles.introText}>
        <MaterialCommunityIcons name="eye" size={24} color="black" /> Seen
      </Text>
      <Text style={styles.whiteText}>
        Stuff you've seen! Mark things using the 'eye' icon.
      </Text>
      <Text style={styles.introText}>
        <MaterialCommunityIcons name="heart-outline" size={24} color="black" />{" "}
        Favorites
      </Text>
      <Text style={styles.whiteText}>
        What do you think this is for??? Use the heart icon dummy
      </Text>
      <Text style={styles.introText}>
        <MaterialCommunityIcons name="history" size={24} color="black" /> Watch
        List
      </Text>
      <Text style={styles.whiteText}>
        Stuff you haven't watched yet, but want to!
      </Text>
      <Text style={styles.introText}>Filters</Text>
      <Text style={styles.whiteText}>
        Use the filters on any page to narrow down your search!
      </Text>
    </View>
  );
};

export default Intro;
