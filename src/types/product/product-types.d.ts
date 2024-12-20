// src/types/product-types.ts
export interface Product {
  id: string;
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
  variantObj: Variant[];
  variantType: string;
  variantId: string;
  newReleaseSKU: string;
  tableOfContents?: string;
}

export interface VariantFormat {
  label: string;
  price: number;
  currency: string;
}

interface BlockData {
  text: string;
}

interface Block {
  id: string;
  data: BlockData;
  type: string;
}

interface DescriptionJSON {
  time: number;
  blocks: Block[];
  version: string;
}