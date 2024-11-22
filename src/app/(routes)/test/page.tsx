"use client";
import React from "react";
import { useFetchProductsQuery } from "../../../../gql/graphql";

const TestRoute = () => {
  const { data, loading, error } = useFetchProductsQuery();

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error)
    return <p className="text-center text-red-500">Error: {error.message}</p>;

  const products = data?.products;

  if (!products) {
    return <p className="text-center text-lg">No products found</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Products</h1>
      {products.edges.length === 0 ? (
        <p className="text-center text-lg">No products found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {products.edges.map(({ node }) => (
            <div
              key={node.id}
              className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-4"
            >
              <img
                src={node.media?.[0]?.url || "/default-image.jpg"}
                alt={node.name}
                className="w-full h-40 object-cover rounded-md"
              />
              <h2 className="text-lg font-semibold mt-4">{node.name.slice(0,30)}</h2>
              <p className="text-gray-600 mt-2">
                Rating: {node.rating || "No rating"}
              </p>
              <a
                href={`/products/${node.slug}`}
                className="block mt-4 bg-secondary text-white text-center py-2 rounded-md transition-colors duration-200"
              >
                View Details
              </a>
            </div>
          ))}
        </div>
      )}
      {/* {products.pageInfo.hasNextPage && (
        <div className="text-center mt-8">
          <button
            onClick={() => console.log("Load more products")}
            className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors duration-200"
          >
            Load More
          </button>
        </div>
      )} */}
    </div>
  );
};

export default TestRoute;
