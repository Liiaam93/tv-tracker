import { createContext } from "react";
import {
  StringContextType,
  TVDataContextType,
  BooleanContextType,
} from "../../types";

export const SearchContext = createContext<StringContextType>(["", () => null]);
export const TVDataContext = createContext<TVDataContextType>([[], () => null]);
export const WatchListContext = createContext<TVDataContextType>([
  [],
  () => null,
]);
export const FavoritesContext = createContext<TVDataContextType>([
  [],
  () => null,
]);
export const CheckBoxContext = createContext<StringContextType>([
  "",
  () => null,
]);
export const WatchedListVisibleContext = createContext<BooleanContextType>([
  false,
  () => null,
]);
