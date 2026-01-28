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
  // iPhone 16 series
  {
    id: "iphone-16-pro-max",
    name: "iPhone 16 Pro Max",
    basePrice: 1149,
    storageOptions: ["256GB", "512GB", "1TB"],
    colours: ["Black Titanium", "White Titanium", "Natural Titanium", "Desert Titanium"],
    condition: "Excellent",
  },
  {
    id: "iphone-16-pro",
    name: "iPhone 16 Pro",
    basePrice: 1099,
    storageOptions: ["256GB", "512GB"],
    colours: ["Black Titanium", "White Titanium", "Natural Titanium"],
    condition: "Excellent",
  },
  {
    id: "iphone-16-plus",
    name: "iPhone 16 Plus",
    basePrice: 999,
    storageOptions: ["128GB", "256GB"],
    colours: ["Midnight", "Starlight", "Blue", "Pink"],
    condition: "Like New",
  },
  {
    id: "iphone-16",
    name: "iPhone 16",
    basePrice: 949,
    storageOptions: ["128GB", "256GB"],
    colours: ["Midnight", "Starlight", "Blue", "Pink"],
    condition: "Like New",
  },

  // iPhone 15 series
  {
    id: "iphone-15-pro-max",
    name: "iPhone 15 Pro Max",
    basePrice: 1049,
    storageOptions: ["256GB", "512GB", "1TB"],
    colours: ["Black Titanium", "Blue Titanium", "White Titanium", "Natural Titanium"],
    condition: "Excellent",
  },
  {
    id: "iphone-15-pro",
    name: "iPhone 15 Pro",
    basePrice: 999,
    storageOptions: ["128GB", "256GB", "512GB"],
    colours: ["Black Titanium", "Blue Titanium", "White Titanium", "Natural Titanium"],
    condition: "Excellent",
  },
  {
    id: "iphone-15-plus",
    name: "iPhone 15 Plus",
    basePrice: 899,
    storageOptions: ["128GB", "256GB"],
    colours: ["Black", "Blue", "Green", "Yellow", "Pink"],
    condition: "Like New",
  },
  {
    id: "iphone-15",
    name: "iPhone 15",
    basePrice: 849,
    storageOptions: ["128GB", "256GB"],
    colours: ["Black", "Blue", "Green", "Yellow", "Pink"],
    condition: "Like New",
  },

  // iPhone 14 series
  {
    id: "iphone-14-pro-max",
    name: "iPhone 14 Pro Max",
    basePrice: 899,
    storageOptions: ["128GB", "256GB", "512GB"],
    colours: ["Deep Purple", "Gold", "Silver", "Space Black"],
    condition: "Excellent",
  },
  {
    id: "iphone-14-pro",
    name: "iPhone 14 Pro",
    basePrice: 849,
    storageOptions: ["128GB", "256GB", "512GB"],
    colours: ["Deep Purple", "Gold", "Silver", "Space Black"],
    condition: "Excellent",
  },
  {
    id: "iphone-14-plus",
    name: "iPhone 14 Plus",
    basePrice: 799,
    storageOptions: ["128GB", "256GB"],
    colours: ["Midnight", "Starlight", "Blue", "Purple"],
    condition: "Very Good",
  },
  {
    id: "iphone-14",
    name: "iPhone 14",
    basePrice: 749,
    storageOptions: ["128GB", "256GB"],
    colours: ["Midnight", "Starlight", "Blue", "Purple"],
    condition: "Very Good",
  },

  // iPhone 13 series
  {
    id: "iphone-13-pro-max",
    name: "iPhone 13 Pro Max",
    basePrice: 799,
    storageOptions: ["128GB", "256GB", "512GB"],
    colours: ["Graphite", "Gold", "Silver", "Sierra Blue", "Alpine Green"],
    condition: "Very Good",
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
    id: "iphone-13-mini",
    name: "iPhone 13 mini",
    basePrice: 599,
    storageOptions: ["128GB", "256GB"],
    colours: ["Midnight", "Starlight", "Blue", "Pink"],
    condition: "Very Good",
  },
  {
    id: "iphone-13",
    name: "iPhone 13",
    basePrice: 649,
    storageOptions: ["128GB", "256GB"],
    colours: ["Midnight", "Starlight", "Blue", "Pink"],
    condition: "Very Good",
  },

  // iPhone 12 series
  {
    id: "iphone-12-pro-max",
    name: "iPhone 12 Pro Max",
    basePrice: 649,
    storageOptions: ["128GB", "256GB"],
    colours: ["Pacific Blue", "Gold", "Silver", "Graphite"],
    condition: "Very Good",
  },
  {
    id: "iphone-12-pro",
    name: "iPhone 12 Pro",
    basePrice: 599,
    storageOptions: ["128GB", "256GB"],
    colours: ["Pacific Blue", "Gold", "Silver", "Graphite"],
    condition: "Very Good",
  },
  {
    id: "iphone-12-mini",
    name: "iPhone 12 mini",
    basePrice: 499,
    storageOptions: ["64GB", "128GB"],
    colours: ["Black", "White", "Red", "Green", "Blue", "Purple"],
    condition: "Very Good",
  },
  {
    id: "iphone-12",
    name: "iPhone 12",
    basePrice: 529,
    storageOptions: ["64GB", "128GB"],
    colours: ["Black", "White", "Red", "Green", "Blue", "Purple"],
    condition: "Very Good",
  },

  // iPhone 11 series
  {
    id: "iphone-11-pro-max",
    name: "iPhone 11 Pro Max",
    basePrice: 549,
    storageOptions: ["64GB", "256GB"],
    colours: ["Midnight Green", "Gold", "Space Grey", "Silver"],
    condition: "Very Good",
  },
  {
    id: "iphone-11-pro",
    name: "iPhone 11 Pro",
    basePrice: 499,
    storageOptions: ["64GB", "256GB"],
    colours: ["Midnight Green", "Gold", "Space Grey", "Silver"],
    condition: "Very Good",
  },
  {
    id: "iphone-11",
    name: "iPhone 11",
    basePrice: 449,
    storageOptions: ["64GB", "128GB"],
    colours: ["Black", "White", "Red", "Green", "Yellow", "Purple"],
    condition: "Very Good",
  },

  // iPhone X / XS / XR series
  {
    id: "iphone-xs-max",
    name: "iPhone XS Max",
    basePrice: 429,
    storageOptions: ["64GB", "256GB"],
    colours: ["Gold", "Silver", "Space Grey"],
    condition: "Good",
  },
  {
    id: "iphone-xs",
    name: "iPhone XS",
    basePrice: 399,
    storageOptions: ["64GB", "256GB"],
    colours: ["Gold", "Silver", "Space Grey"],
    condition: "Good",
  },
  {
    id: "iphone-xr",
    name: "iPhone XR",
    basePrice: 379,
    storageOptions: ["64GB", "128GB"],
    colours: ["Black", "White", "Red", "Blue", "Coral", "Yellow"],
    condition: "Good",
  },
  {
    id: "iphone-x",
    name: "iPhone X",
    basePrice: 349,
    storageOptions: ["64GB", "256GB"],
    colours: ["Silver", "Space Grey"],
    condition: "Good",
  },

  // iPhone SE models
  {
    id: "iphone-se-2022",
    name: "iPhone SE (2022)",
    basePrice: 329,
    storageOptions: ["64GB", "128GB"],
    colours: ["Midnight", "Starlight", "Red"],
    condition: "Good",
  },
  {
    id: "iphone-se-2020",
    name: "iPhone SE (2020)",
    basePrice: 299,
    storageOptions: ["64GB", "128GB"],
    colours: ["Black", "White", "Red"],
    condition: "Good",
  },
  {
    id: "iphone-se",
    name: "iPhone SE (3rd Gen)",
    basePrice: 279,
    storageOptions: ["64GB", "128GB"],
    colours: ["Midnight", "Starlight", "Red"],
    condition: "Good",
  },

  // iPhone 8 & 7 series
  {
    id: "iphone-8-plus",
    name: "iPhone 8 Plus",
    basePrice: 259,
    storageOptions: ["64GB", "128GB"],
    colours: ["Gold", "Silver", "Space Grey", "Red"],
    condition: "Good",
  },
  {
    id: "iphone-8",
    name: "iPhone 8",
    basePrice: 229,
    storageOptions: ["64GB", "128GB"],
    colours: ["Gold", "Silver", "Space Grey", "Red"],
    condition: "Good",
  },
  {
    id: "iphone-7-plus",
    name: "iPhone 7 Plus",
    basePrice: 199,
    storageOptions: ["32GB", "128GB"],
    colours: ["Black", "Silver", "Gold", "Rose Gold"],
    condition: "Good",
  },
  {
    id: "iphone-7",
    name: "iPhone 7",
    basePrice: 179,
    storageOptions: ["32GB", "128GB"],
    colours: ["Black", "Silver", "Gold", "Rose Gold"],
    condition: "Good",
  },
];
