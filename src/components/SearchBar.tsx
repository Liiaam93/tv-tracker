import React from "react";
import { Button, TextInput, View } from "react-native";
import { styles } from "../styles/styles";

type Props = {
  setSearch: (value: string) => void;
  handleSearch?: (searchInput: string) => Promise<void>;
  search: string;
};

const SearchBar = ({ setSearch, handleSearch, search }: Props) => {
  return (
    <View style={styles.screenContainer}>
      <View style={styles.navContainer}>
        <TextInput
          style={styles.searchBox}
          onChangeText={(text) => setSearch(text)}
          placeholder={"Film, TV Show, Game..."}
        ></TextInput>
        <View style={styles.searchButton}>
          <Button
            onPress={() => (handleSearch ? handleSearch(search) : "")}
            title="Search"
          />
        </View>
      </View>
    </View>
  );
};

export default SearchBar;
