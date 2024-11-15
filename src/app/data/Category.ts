// data/CategoryList.ts

export interface Subcategory {
  subcategory: string;
  topics?: string[];
};

export interface Category {
  category: string;
  subcategories: (string | Subcategory)[];
};

export const CategoryList: Category[] = [
  {
    category: "Books",
    subcategories: [
      "Basic Medical Sciences",
      {
        subcategory: "Dentistry",
        topics: [
          "Dental Anatomy & Physiology",
          "Dental Anesthesiology",
          "Caries in Dentistry",
          "Craniomandibular",
          "Temporomandibular",
          "Dental Assisting",
          "Dental Hygiene",
          "Dental Materials",
          "Dental Office Practice",
          "Endodontics",
          "Oral Pathology",
          "Oral Radiology",
          "Oral Surgery",
          "Orthodontics",
          "Dental Pediatrics",
          "Dental Periodontics",
          "Dental Pharmacology",
          "Preventive Dentistry",
          "Prosthodontics",
        ],
      },
      "Medicine",
      "Nursing",
      "Pharmacology",
    ],
  },
  {
    category: "Lab Coats",
    subcategories: [
      "Men's Lab Coats",
      "Women's Lab Coats",
      "Unisex Lab Coats",
    ],
  },
  {
    category: "Scrubs",
    subcategories: [
      "Men's Scrubs",
      "Women's Scrubs",
      "Pediatric Scrubs",
      "Maternity Scrubs",
    ],
  },
  {
    category: "Stethoscopes",
    subcategories: [
      "Cardiology Stethoscopes",
      "Pediatric Stethoscopes",
      "Electronic Stethoscopes",
      "Basic Stethoscopes",
    ],
  },
  {
    category: "Medical Devices",
    subcategories: [
      "Blood Pressure Devices",
      "Thermometers",
      "pulse Oximeters",
      "Otoscopes",
      "Ophthalmoscopes"
    ],
  },
  {
    category: "Accessories",
    subcategories: [
      "Badge Holders",
      "Penlights",
      "Reflex Hammers",
      "Medical Scissors",
    ],
  },
];
