export interface TVPROPS {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
}

export type RootStackParamList = {
  Home: undefined;
  WatchedList: undefined;
  Favorites: undefined;
};

export type TVDataContextType = [
  TVPROPS[],
  React.Dispatch<React.SetStateAction<TVPROPS[]>>
];
export type StringContextType = [
  string,
  React.Dispatch<React.SetStateAction<string>>
];
export type BooleanContextType = [
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>
];
