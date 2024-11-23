"use client";
import React from "react";
import { useParams } from "next/navigation";

interface Params {
  query?: string;
}

const SearchResults: React.FC = () => {
  const params = useParams() as unknown as Params;
  const decodedQuery = params.query ? decodeURIComponent(params.query) : "";

  return (
    <div className="h-[40vh]">
      <h1 className="text-[3vh] my-[3vh] text-center font-medium">
        Search Results for {decodedQuery}
      </h1>
    </div>
  );
};

export default SearchResults;