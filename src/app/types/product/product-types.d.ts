// src/types/product-types.ts
export interface Product {
    id: number;
    name: string;
    Author: string;
    mainImage: string;
    subImage: string[];
    available: boolean;
    currency: string;
    currencySymbol: string;
    price: number;
    cuttedPrice: number;
    ratings: number;
    description: string;
    ISBN_NO: string;
    Series: string;
    Publisher: string;
    PublicationDate: string;
    Cover: string;
    Pages: number;
    Weight: string;
  }
  
  export interface BookFormat {
    label: string;
    price: number;
    currency: string;
  }
  