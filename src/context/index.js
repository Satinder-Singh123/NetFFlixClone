"use client";

import CircleLoader from "@/components/circle-loader";
import { useSession } from "next-auth/react";
import { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [loggedInAccount, setLoggedInAccount] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [pageLoader, setPageLoader] = useState(true);
  const [mediaData, setMediaData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [currentMediaInfoIDAndType, setcurrentMediaInfoIDAndType] =
    useState(null);
  const [showDetailsPopup, setshowDetailsPopup] = useState(false);
  const [mediaDetails, setMediaDetails] = useState(null);
  const [similarMedias, setSimilarMedias] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const { data: session } = useSession();

  useEffect(() => {
    setLoggedInAccount(JSON.parse(sessionStorage.getItem("loggedInAccount")));
  }, []);

  if (session === undefined) return <CircleLoader />;

  return (
    <GlobalContext.Provider
      value={{
        loggedInAccount,
        setLoggedInAccount,
        accounts,
        setAccounts,
        pageLoader,
        setPageLoader,
        mediaData,
        setMediaData,
        searchResults,
        setSearchResults,
        currentMediaInfoIDAndType,
        setcurrentMediaInfoIDAndType,
        showDetailsPopup,
        setshowDetailsPopup,
        mediaDetails,
        setMediaDetails,
        similarMedias,
        setSimilarMedias,
        favorites,
        setFavorites,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
