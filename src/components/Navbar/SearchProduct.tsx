"use client";
import React, { useState, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import {
  SearchProductsQuery,
  useSearchProductsLazyQuery,
} from "../../../gql/graphql";
import { RiSearchLine } from "react-icons/ri";
import { redirectToSearch } from "@/server/searchRedirect";
import Loader from "@/app/elements/Loader";

const SearchingProductResults = dynamic(
  () => import("@/components/Navbar/SearchingProductResults"),
  { ssr: false }
);

interface SearchProductProps {
  channel: string;
  locale: string;
};

const SearchProduct: React.FC<SearchProductProps> = ({ channel, locale }) => {

  const [searchData, setSearchData] = useState<SearchProductsQuery | undefined>(
    undefined
  );
  const [val, setVal] = useState("");
  const [isReady, setIsReady] = useState(false);
  const pathname = usePathname();

  const [searchProducts, { loading, error }] = useSearchProductsLazyQuery({
    fetchPolicy: "network-only",
    onCompleted(data) {
      setSearchData(data);
    },
  });

  const handleSearch = useCallback(async () => {
    setIsReady(true);
    await searchProducts({
      variables: {
        first: 10,
        channel: channel,
        where: {
          name: {
            oneOf: [val],
          },
        },
      },
    });
  }, [channel, val, searchProducts]);

  useEffect(() => {
    if (!val || val.length <= 2) {
      setSearchData(undefined);
      setIsReady(false);
      return;
    }
    const searchTimer = setTimeout(async () => {
      await handleSearch();
    }, 500);
    return () => {
      clearTimeout(searchTimer);
    };
  }, [val, handleSearch]);

  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault();
    setSearchData(undefined);
    if (!val || val.length <= 2) {
      setIsReady(false);
      return;
    }
    if (loading) return;
    await redirectToSearch({ channel, locale, searchValue: val });
  };

  if (pathname.includes("search")) {
    return null;
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search by keyword, title, author or IBSN"
          className="w-full outline-none px-4 py-2 border-2 border-textgray rounded-full focus:outline-none"
          value={val}
          onChange={(e) => setVal(e.currentTarget.value)}
        />
        <button
          type="submit"
          className="bg-secondary absolute inset-y-0 right-0 flex items-center justify-center px-4 rounded-r-full"
        >
          {loading ? (
            <Loader />
          ) : (
            <RiSearchLine
              className="text-xl 3xl:text-lg cursor-pointer hover:scale-110 transition-all duration-300"
              color="#fff"
            />
          )}
        </button>
      </form>

      {searchData && isReady ? (
        <SearchingProductResults
          data={searchData}
          setIsReady={setIsReady}
          searchTerm={val}
        />
      ) : null}
    </>
  );
};

export default SearchProduct;