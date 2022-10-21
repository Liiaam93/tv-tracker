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
  FavoritesContext,
} from "./src/context/context";
import Favorites from "./src/components/Favorites";

export default function App() {
  const [search, setSearch] = useState<string>("");
  const [tvData, setTVData] = useState<TVPROPS[]>([]);
  const [watched, setWatched] = useState<TVPROPS[]>([]);
  const [favorites, setFavorites] = useState<TVPROPS[]>([]);
  const [watchedListVisible, setWatchedListVisible] = useState<boolean>(false);
  const [checkBox, setCheckBox] = useState<string>("All");

  const getLocalStorage = async () => {
    const watchedList = await AsyncStorage.getItem("react-watched");
    const favoriteList = await AsyncStorage.getItem("react-favorites");
    if (watchedList !== null) {
      const watchedListParse: TVPROPS[] = JSON.parse(watchedList);
      setWatched(watchedListParse);
    }
    if (favoriteList !== null) {
      const favoriteListParse: TVPROPS[] = JSON.parse(favoriteList);
      setFavorites(favoriteListParse);
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
                <FavoritesContext.Provider value={[favorites, setFavorites]}>
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
                    <Stack.Screen
                      name="Favorites"
                      component={Favorites}
                      options={{
                        title: "My Favorites",
                      }}
                    />
                  </Stack.Navigator>
                </FavoritesContext.Provider>
              </WatchedListVisibleContext.Provider>
            </SearchContext.Provider>
          </CheckBoxContext.Provider>
        </WatchListContext.Provider>
      </TVDataContext.Provider>
    </NavigationContainer>
  );
}
