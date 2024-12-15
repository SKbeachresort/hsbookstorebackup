// "use client"; 
// import React,{useEffect, useState} from "react";
// import { useUserQuery } from "../../gql/graphql";
// import { getAccessToken } from "@/utils/accessToken";
// import { useRegions } from "@/context/RegionProviders";
// import { localeToEnum } from "@/lib/regions";

// export const getUserDetails = () => {

//   const { currentChannel, currentLocale } = useRegions();

//   const { data, loading, error } = useUserQuery({
//     variables:{
//       locale: localeToEnum(currentLocale),
//       channel: currentChannel.slug,
//     },
//     fetchPolicy: "network-only",
//   });

//   // console.log("Data:", data);

//   return {
//     user: data?.user || null,
//     loading,
//     error,
//   };
// };