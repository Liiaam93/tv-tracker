import React from "react";
import { Button, TextInput, View } from "react-native";
import { Searchbar } from "react-native-paper";
import { styles } from "../styles/styles";
import { Keyboard } from "react-native";

type Props = {
  setSearch: (value: string) => void;
  handleSearch?: (searchInput: string) => Promise<void>;
  search: string;
};

const SearchBar: React.FC<Props> = ({ setSearch, handleSearch, search }) => {
  const handleKeyDown = () => {
    handleSearch ? handleSearch(search) : "";
  };

  return (
    <View style={styles.screenContainer}>
      <View style={styles.navContainer}></View>
      <Searchbar
        placeholder="Search"
        value={search}
        onChangeText={(text) => setSearch(text)}
        onSubmitEditing={() => handleKeyDown()}
        onIconPress={() =>
          handleSearch ? handleSearch(search) : Keyboard.dismiss()
        }
        style={{ margin: 10 }}
      />
    </View>
  );
};

export default SearchBar;
