import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TVPROPS } from "./types";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  SearchContext,
  TVDataContext,
  WatchedListContext,
  WatchListContext,
  WatchedListVisibleContext,
  CheckBoxContext,
  FavoritesContext,
} from "./src/context/context";
import { BottomNavigation } from "react-native-paper";
import HomeScreen from "./src/screens/HomeScreen";
import WatchedList from "./src/screens/WatchedList";
import Favorites from "./src/screens/Favorites";
import WatchList from "./src/screens/WatchList";

export default function App() {
  const [search, setSearch] = useState<string>("");
  const [tvData, setTVData] = useState<TVPROPS[]>([]);
  const [watched, setWatched] = useState<TVPROPS[]>([]);
  const [favorites, setFavorites] = useState<TVPROPS[]>([]);
  const [watchList, setWatchList] = useState<TVPROPS[]>([]);
  const [watchedListVisible, setWatchedListVisible] = useState<boolean>(false);
  const [checkBox, setCheckBox] = useState<string>("All");
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {
      key: "Home",
      title: "Search",
      focusedIcon: "magnify",
      unfocusedIcon: "magnify-expand",
    },
    { key: "Seen", title: "Seen", focusedIcon: "eye" },
    {
      key: "favorites",
      title: "Favorites",
      focusedIcon: "heart",
      unfocusedIcon: "heart-outline",
    },
    { key: "watchlist", title: "Watch List", focusedIcon: "history" },
  ]);
  const renderScene = BottomNavigation.SceneMap({
    Home: HomeScreen,
    Seen: WatchedList,
    favorites: Favorites,
    watchlist: WatchList,
  });

  const getLocalStorage = async () => {
    const watchedList = await AsyncStorage.getItem("react-watched");
    const favoriteList = await AsyncStorage.getItem("react-favorites");
    const watchList = await AsyncStorage.getItem("react-watchlist");
    if (watchedList !== null) {
      const watchedListParse: TVPROPS[] = JSON.parse(watchedList);
      setWatched(watchedListParse);
    }
    if (favoriteList !== null) {
      const favoriteListParse: TVPROPS[] = JSON.parse(favoriteList);
      setFavorites(favoriteListParse);
    }
    if (watchList !== null) {
      const watchlistParse: TVPROPS[] = JSON.parse(watchList);
      setWatchList(watchlistParse);
    }
  };

  useEffect(() => {
    getLocalStorage();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "darkslategrey" }}>
      <TVDataContext.Provider value={[tvData, setTVData]}>
        <WatchedListContext.Provider value={[watched, setWatched]}>
          <WatchListContext.Provider value={[watchList, setWatchList]}>
            <CheckBoxContext.Provider value={[checkBox, setCheckBox]}>
              <SearchContext.Provider value={[search, setSearch]}>
                <WatchedListVisibleContext.Provider
                  value={[watchedListVisible, setWatchedListVisible]}
                >
                  <FavoritesContext.Provider value={[favorites, setFavorites]}>
                    <BottomNavigation
                      navigationState={{ index, routes }}
                      onIndexChange={setIndex}
                      renderScene={renderScene}
                    />
                  </FavoritesContext.Provider>
                </WatchedListVisibleContext.Provider>
              </SearchContext.Provider>
            </CheckBoxContext.Provider>
          </WatchListContext.Provider>
        </WatchedListContext.Provider>
      </TVDataContext.Provider>
      <StatusBar style="auto" />
    </View>
  );
}
