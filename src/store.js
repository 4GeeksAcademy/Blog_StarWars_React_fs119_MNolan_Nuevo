export const initialStore = () => {
  return {
    favorites: [],
    characters: [],
    planets: [],
    starships: [],
    baseURL: "https://swapi.tech/api"
  }
}

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "setData":
      return { ...store, [action.key]: action.payload };

    case "addFavorite":
      if (store.favorites.some((fav) => fav.id === action.payload.id && fav.type === action.payload.type))
        return store;
      return { ...store, favorites: [...store.favorites, action.payload] };
    
      case "removeFavorite":
      return {
        ...store,
        favorites: store.favorites.filter(
          (fav) => !(fav.id === action.payload.id && fav.type === action.payload.type)
        ),
      };
    default:
      throw Error('Unknown action.');
  }
}
