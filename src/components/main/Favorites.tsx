import React from "react";
import { useNavigate } from "@/hooks/useNavigate";
import { fetchDelFavorites } from "@/services/stock";
import { useStorage } from "@/hooks/useStorage";
import { useFavoriteStore } from "@/stores";
import { IFavorit } from "@/types/stock";

const Favorites: React.FC = () => {
  const { navigateToStockDetail } = useNavigate();
  const { user } = useStorage();
  const { favorites, removeFavorite } = useFavoriteStore();

  const handleNavigateClick = (favorite: IFavorit) => {
    navigateToStockDetail({
      market: favorite.market,
      name: favorite.name,
      code: favorite.code,
    });
  };

  const handleFavoriteDelete = async (favorite: IFavorit) => {
    if (user) {
      const deletedFavorite = await fetchDelFavorites(user.id, favorite.code);
      if (deletedFavorite.success) {
        removeFavorite(favorite.code);
      }
    }
  };

  return (
    <div className="w-full m-2 p-4">
      <div className="text-center text-green-razer text-md my-[9px] border-b border-green-500">
        즐겨찾기 리스트
      </div>
      {favorites.length > 0 ? (
        <ul className="space-y-4">
          {favorites.map((favorite) => (
            <li
              key={favorite.code}
              className="flex items-center justify-between p-2 bg-gray-800 rounded-lg shadow"
            >
              <div>
                <h3 className="text-sm font-bold text-white">
                  {favorite.name}
                </h3>
                <p className="text-xs text-gray-400">{favorite.market}</p>
              </div>
              <div className="ml-auto flex space-x-4">
                <button
                  className="text-yellow-500 hover:text-yellow-700"
                  onClick={() => handleFavoriteDelete(favorite)}
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                </button>

                <div
                  className="text-green-500 hover:text-green-700 cursor-pointer"
                  onClick={() => handleNavigateClick(favorite)}
                >
                  &gt;
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No favorites available.</p>
      )}
    </div>
  );
};

export default Favorites;
