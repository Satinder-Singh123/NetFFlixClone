"use client";

import { signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import Search from "./search";
import { AiOutlineSearch } from "react-icons/ai";
import { GlobalContext } from "@/context";
import AccountPopup from "./account-popup";
import CircleLoader from "../circle-loader";
import DetailPopup from "../details-popup";

export default function Navbar() {
  const { data: session } = useSession();
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAccountPopup, setShowAccountPopup] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  const {
    setPageLoader,
    loggedInAccount,
    setAccounts,
    accounts,
    setLoggedInAccount,
    pageLoader,
    showDetailsPopup,
    setshowDetailsPopup,
  } = useContext(GlobalContext);

  const menuItems = [
    {
      id: "home",
      title: "Home",
      path: "/browse",
    },
    {
      id: "tv",
      title: "TV",
      path: "/tv",
    },
    {
      id: "movies",
      title: "MOVIES",
      path: "/movies",
    },
    {
      id: "my-list",
      title: "My List",
      path: `/my-list/${session?.user?.uid}/${loggedInAccount?._id}`,
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) setIsScrolled(true);
      else setIsScrolled(false);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  async function getAllAccounts() {
    const res = await fetch(
      `api/account/get-all-accounts?id=${session?.user?.uid}`,
      {
        method: "GET",
      }
    );

    const data = await res.json();
    console.log(data);

    //set all accounts data.data
    if (data && data.data && data.data.length) {
      setAccounts(data.data);
      setPageLoader(false);
    } else {
      setPageLoader(false);
    }
  }

  useEffect(() => {
    getAllAccounts();
  }, []);

  if (pageLoader) return <CircleLoader />;

  return (
    <div className="relative">
      <header
        className={`header ${isScrolled && "bg-[#141414] hover:bg-[#141414]"}`}
      >
        <div className="flex items-center space-x-2 md:space-x-10 ">
          <img
            src="https://rb.gy/ulxxee"
            width={120}
            height={120}
            alt="NETFLIX"
            className="cursor-pointer object-contain"
            onClick={() => router.push("/browse")}
          />
          <ul className="hidden md:space-x-4 md:flex cursor-pointer lg:w-full sm:w-16">
            {menuItems.map((item) => (
              <li
                onClick={() => {
                  setPageLoader(true);
                  router.push(item.path);
                  setSearchQuery("");
                  setShowSearchBar(false);
                }}
                className="cursor-pointer text-[16px] font-light text-[#e5e5e5] transition duration-[.4s] hover:text-[#b3b3b3]"
                key={item._id}
              >
                {item.title}
              </li>
            ))}
          </ul>
        </div>
        <div className="font-light flex items-center space-x-4 text-sm">
          {showSearchBar ? (
            <Search
              pathname={pathname}
              router={router}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              setPageLoader={setPageLoader}
              setShowSearchBar={setShowSearchBar}
            />
          ) : (
            <AiOutlineSearch
              onClick={() => setShowSearchBar(true)}
              className="hidden sm:inline sm:h-6 cursor-pointer"
            />
          )}
          <div
            onClick={() => setShowAccountPopup(true)}
            className="flex gap-2 items-center cursor-pointer"
          >
            <img
              src="https://occ-0-2611-3663.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABfNXUMVXGhnCZwPI1SghnGpmUgqS_J-owMff-jig42xPF7vozQS1ge5xTgPTzH7ttfNYQXnsYs4vrMBaadh4E6RTJMVepojWqOXx.png?r=1d4"
              alt="Current Profile"
              className="max-w-[30px] rounded min-w-[20px] max-h-[30px] min-h-[20px] object-cover w-[30px] h-[30px]"
            />
            <p>{loggedInAccount && loggedInAccount.name}</p>
          </div>
        </div>
      </header>
      <DetailPopup show={showDetailsPopup} setShow={setshowDetailsPopup} />
      {showAccountPopup && (
        <AccountPopup
          accounts={accounts}
          setPageLoader={setPageLoader}
          signOut={signOut}
          loggedInAccount={loggedInAccount}
          setLoggedInAccount={setLoggedInAccount}
        />
      )}
    </div>
  );
}
