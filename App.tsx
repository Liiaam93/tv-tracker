import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootStackParamList, TVPROPS } from "./types";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/components/HomeScreen";
import WatchedList from "./src/components/WatchedList";
import {
  SearchContext,
  TVDataContext,
  WatchListContext,
  WatchedListVisibleContext,
  CheckBoxContext,
} from "./src/context/context";
import Favorites from "./src/components/Favorites";

export default function App() {
  const [search, setSearch] = useState<string>("");
  const [tvData, setTVData] = useState<TVPROPS[]>([]);
  const [watched, setWatched] = useState<TVPROPS[]>([]);
  const [watchedListVisible, setWatchedListVisible] = useState<boolean>(false);
  const [checkBox, setCheckBox] = useState<string>("All");

  const getLocalStorage = async () => {
    const movieFavourites = await AsyncStorage.getItem("react-watched");
    if (movieFavourites !== null) {
      const movieFavouritesParse: TVPROPS[] = JSON.parse(movieFavourites);
      setWatched(movieFavouritesParse);
    }
  };

  useEffect(() => {
    getLocalStorage();
  }, []);

  const Stack = createStackNavigator<RootStackParamList>();

  return (
    <NavigationContainer>
      <TVDataContext.Provider value={[tvData, setTVData]}>
        <WatchListContext.Provider value={[watched, setWatched]}>
          <CheckBoxContext.Provider value={[checkBox, setCheckBox]}>
            <SearchContext.Provider value={[search, setSearch]}>
              <WatchedListVisibleContext.Provider
                value={[watchedListVisible, setWatchedListVisible]}
              >
                <Stack.Navigator
                  screenOptions={{
                    headerStyle: {
                      backgroundColor: "darkslategrey",
                    },
                    headerTintColor: "#fff",
                    headerTitleStyle: {
                      fontWeight: "bold",
                      alignSelf: "center",
                    },
                    headerTitleAlign: "center",
                  }}
                >
                  <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                      title: "Search",
                    }}
                  />
                  <Stack.Screen
                    name="WatchedList"
                    component={WatchedList}
                    options={{
                      title: "My Watch List",
                    }}
                  />
                </Stack.Navigator>
              </WatchedListVisibleContext.Provider>
            </SearchContext.Provider>
          </CheckBoxContext.Provider>
        </WatchListContext.Provider>
      </TVDataContext.Provider>
    </NavigationContainer>
  );
}
