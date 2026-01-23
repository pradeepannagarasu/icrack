export type RefurbishedIphone = {
  id: string;
  name: string;
  basePrice: number;
  storageOptions: string[];
  colours: string[];
  condition: string;
};

// Static data for refurbished iPhones
export const refurbishedIphones: RefurbishedIphone[] = [
  {
    id: "iphone-15-pro-max",
    name: "iPhone 15 Pro Max",
    basePrice: 1099,
    storageOptions: ["256GB", "512GB", "1TB"],
    colours: ["Black Titanium", "Blue Titanium", "White Titanium", "Natural Titanium"],
    condition: "Excellent",
  },
  {
    id: "iphone-15",
    name: "iPhone 15",
    basePrice: 799,
    storageOptions: ["128GB", "256GB"],
    colours: ["Black", "Blue", "Green", "Yellow", "Pink"],
    condition: "Like New",
  },
  {
    id: "iphone-14-pro",
    name: "iPhone 14 Pro",
    basePrice: 899,
    storageOptions: ["128GB", "256GB", "512GB"],
    colours: ["Deep Purple", "Gold", "Silver", "Space Black"],
    condition: "Excellent",
  },
  {
    id: "iphone-13-pro",
    name: "iPhone 13 Pro",
    basePrice: 749,
    storageOptions: ["128GB", "256GB"],
    colours: ["Graphite", "Gold", "Silver", "Sierra Blue", "Alpine Green"],
    condition: "Very Good",
  },
  {
    id: "iphone-12",
    name: "iPhone 12",
    basePrice: 549,
    storageOptions: ["64GB", "128GB"],
    colours: ["Black", "White", "Red", "Green", "Blue", "Purple"],
    condition: "Very Good",
  },
  {
    id: "iphone-se",
    name: "iPhone SE (3rd Gen)",
    basePrice: 349,
    storageOptions: ["64GB", "128GB"],
    colours: ["Midnight", "Starlight", "Red"],
    condition: "Good",
  },
];


