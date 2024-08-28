import create from "zustand";
import { IFavorit } from "@/types/stock";

interface FavoriteState {
  favorites: IFavorit[];
  addFavorite: (favorite: IFavorit) => void;
  removeFavorite: (stockCode: string) => void;
  setFavorites: (favorites: IFavorit[]) => void;
  clearFavorites: () => void;
}

export const useFavoriteStore = create<FavoriteState>((set) => ({
  favorites: [],
  addFavorite: (favorite) =>
    set((state) => ({
      favorites: [...state.favorites, favorite],
    })),
  removeFavorite: (stockCode) =>
    set((state) => ({
      favorites: state.favorites.filter(
        (favorite) => favorite.code !== stockCode
      ),
    })),
  setFavorites: (favorites) => set({ favorites }),
  clearFavorites: () => set({ favorites: [] }),
}));
