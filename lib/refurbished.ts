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
  // iPhone 16 series (aligned with iSmash-style pricing)
  {
    id: "iphone-16-pro-max",
    name: "iPhone 16 Pro Max",
    basePrice: 699,
    storageOptions: ["256GB", "512GB", "1TB"],
    colours: ["Black Titanium", "White Titanium", "Natural Titanium", "Desert Titanium"],
    condition: "Excellent",
  },
  {
    id: "iphone-16-pro",
    name: "iPhone 16 Pro",
    basePrice: 599,
    storageOptions: ["256GB", "512GB"],
    colours: ["Black Titanium", "White Titanium", "Natural Titanium"],
    condition: "Excellent",
  },
  {
    id: "iphone-16-plus",
    name: "iPhone 16 Plus",
    basePrice: 499,
    storageOptions: ["128GB", "256GB"],
    colours: ["Midnight", "Starlight", "Blue", "Pink"],
    condition: "Like New",
  },
  {
    id: "iphone-16",
    name: "iPhone 16",
    basePrice: 499,
    storageOptions: ["128GB", "256GB"],
    colours: ["Midnight", "Starlight", "Blue", "Pink"],
    condition: "Like New",
  },

  // iPhone 15 series – iSmash renewed: 15 Pro Max £629, 15 Pro £499, 15 £499
  {
    id: "iphone-15-pro-max",
    name: "iPhone 15 Pro Max",
    basePrice: 629,
    storageOptions: ["256GB", "512GB", "1TB"],
    colours: ["Black Titanium", "Blue Titanium", "White Titanium", "Natural Titanium"],
    condition: "Excellent",
  },
  {
    id: "iphone-15-pro",
    name: "iPhone 15 Pro",
    basePrice: 499,
    storageOptions: ["128GB", "256GB", "512GB"],
    colours: ["Black Titanium", "Blue Titanium", "White Titanium", "Natural Titanium"],
    condition: "Excellent",
  },
  {
    id: "iphone-15-plus",
    name: "iPhone 15 Plus",
    basePrice: 449,
    storageOptions: ["128GB", "256GB"],
    colours: ["Black", "Blue", "Green", "Yellow", "Pink"],
    condition: "Like New",
  },
  {
    id: "iphone-15",
    name: "iPhone 15",
    basePrice: 499,
    storageOptions: ["128GB", "256GB", "512GB"],
    colours: ["Black", "Blue", "Green", "Yellow", "Pink"],
    condition: "Like New",
  },

  // iPhone 14 series – iSmash: 14 Pro Max £489, 14 £329
  {
    id: "iphone-14-pro-max",
    name: "iPhone 14 Pro Max",
    basePrice: 489,
    storageOptions: ["128GB", "256GB", "512GB", "1TB"],
    colours: ["Deep Purple", "Gold", "Silver", "Space Black"],
    condition: "Excellent",
  },
  {
    id: "iphone-14-pro",
    name: "iPhone 14 Pro",
    basePrice: 429,
    storageOptions: ["128GB", "256GB", "512GB"],
    colours: ["Deep Purple", "Gold", "Silver", "Space Black"],
    condition: "Excellent",
  },
  {
    id: "iphone-14-plus",
    name: "iPhone 14 Plus",
    basePrice: 369,
    storageOptions: ["128GB", "256GB"],
    colours: ["Midnight", "Starlight", "Blue", "Purple"],
    condition: "Very Good",
  },
  {
    id: "iphone-14",
    name: "iPhone 14",
    basePrice: 329,
    storageOptions: ["128GB", "256GB", "512GB"],
    colours: ["Midnight", "Starlight", "Blue", "Purple"],
    condition: "Very Good",
  },

  // iPhone 13 series – iSmash: 13 Pro Max £599, 13 £229
  {
    id: "iphone-13-pro-max",
    name: "iPhone 13 Pro Max",
    basePrice: 599,
    storageOptions: ["128GB", "256GB", "512GB", "1TB"],
    colours: ["Graphite", "Gold", "Silver", "Sierra Blue", "Alpine Green"],
    condition: "Very Good",
  },
  {
    id: "iphone-13-pro",
    name: "iPhone 13 Pro",
    basePrice: 329,
    storageOptions: ["128GB", "256GB"],
    colours: ["Graphite", "Gold", "Silver", "Sierra Blue", "Alpine Green"],
    condition: "Very Good",
  },
  {
    id: "iphone-13-mini",
    name: "iPhone 13 mini",
    basePrice: 229,
    storageOptions: ["128GB", "256GB"],
    colours: ["Midnight", "Starlight", "Blue", "Pink"],
    condition: "Very Good",
  },
  {
    id: "iphone-13",
    name: "iPhone 13",
    basePrice: 229,
    storageOptions: ["128GB", "256GB", "512GB"],
    colours: ["Midnight", "Starlight", "Blue", "Pink"],
    condition: "Very Good",
  },

  // iPhone 12 series – iSmash: 12 Pro £229, 12 Mini £149, 12 £179
  {
    id: "iphone-12-pro-max",
    name: "iPhone 12 Pro Max",
    basePrice: 279,
    storageOptions: ["128GB", "256GB"],
    colours: ["Pacific Blue", "Gold", "Silver", "Graphite"],
    condition: "Very Good",
  },
  {
    id: "iphone-12-pro",
    name: "iPhone 12 Pro",
    basePrice: 229,
    storageOptions: ["128GB", "256GB"],
    colours: ["Pacific Blue", "Gold", "Silver", "Graphite"],
    condition: "Very Good",
  },
  {
    id: "iphone-12-mini",
    name: "iPhone 12 mini",
    basePrice: 149,
    storageOptions: ["64GB", "128GB", "256GB"],
    colours: ["Black", "White", "Red", "Green", "Blue", "Purple"],
    condition: "Very Good",
  },
  {
    id: "iphone-12",
    name: "iPhone 12",
    basePrice: 179,
    storageOptions: ["64GB", "128GB"],
    colours: ["Black", "White", "Red", "Green", "Blue", "Purple"],
    condition: "Very Good",
  },

  // iPhone 11 series – iSmash: 11 £159
  {
    id: "iphone-11-pro-max",
    name: "iPhone 11 Pro Max",
    basePrice: 229,
    storageOptions: ["64GB", "256GB"],
    colours: ["Midnight Green", "Gold", "Space Grey", "Silver"],
    condition: "Very Good",
  },
  {
    id: "iphone-11-pro",
    name: "iPhone 11 Pro",
    basePrice: 199,
    storageOptions: ["64GB", "256GB"],
    colours: ["Midnight Green", "Gold", "Space Grey", "Silver"],
    condition: "Very Good",
  },
  {
    id: "iphone-11",
    name: "iPhone 11",
    basePrice: 159,
    storageOptions: ["64GB", "128GB"],
    colours: ["Black", "White", "Red", "Green", "Yellow", "Purple"],
    condition: "Very Good",
  },

  // iPhone X / XS / XR series – iSmash: XR £149, XS £129
  {
    id: "iphone-xs-max",
    name: "iPhone XS Max",
    basePrice: 169,
    storageOptions: ["64GB", "256GB"],
    colours: ["Gold", "Silver", "Space Grey"],
    condition: "Good",
  },
  {
    id: "iphone-xs",
    name: "iPhone XS",
    basePrice: 129,
    storageOptions: ["64GB", "256GB"],
    colours: ["Gold", "Silver", "Space Grey"],
    condition: "Good",
  },
  {
    id: "iphone-xr",
    name: "iPhone XR",
    basePrice: 149,
    storageOptions: ["64GB", "128GB", "256GB"],
    colours: ["Black", "White", "Red", "Blue", "Coral", "Yellow"],
    condition: "Good",
  },
  {
    id: "iphone-x",
    name: "iPhone X",
    basePrice: 119,
    storageOptions: ["64GB", "256GB"],
    colours: ["Silver", "Space Grey"],
    condition: "Good",
  },

  // iPhone SE models – iSmash: SE (2020) £99, SE (2022) £149
  {
    id: "iphone-se-2022",
    name: "iPhone SE (2022)",
    basePrice: 149,
    storageOptions: ["64GB", "128GB"],
    colours: ["Midnight", "Starlight", "Red"],
    condition: "Good",
  },
  {
    id: "iphone-se-2020",
    name: "iPhone SE (2020)",
    basePrice: 99,
    storageOptions: ["64GB", "128GB", "256GB"],
    colours: ["Black", "White", "Red"],
    condition: "Good",
  },
  {
    id: "iphone-se",
    name: "iPhone SE (3rd Gen)",
    basePrice: 99,
    storageOptions: ["64GB", "128GB"],
    colours: ["Midnight", "Starlight", "Red"],
    condition: "Good",
  },

  // iPhone 8 & 7 series – iSmash: iPhone 8 from £99
  {
    id: "iphone-8-plus",
    name: "iPhone 8 Plus",
    basePrice: 119,
    storageOptions: ["64GB", "128GB"],
    colours: ["Gold", "Silver", "Space Grey", "Red"],
    condition: "Good",
  },
  {
    id: "iphone-8",
    name: "iPhone 8",
    basePrice: 99,
    storageOptions: ["64GB", "128GB"],
    colours: ["Gold", "Silver", "Space Grey", "Red"],
    condition: "Good",
  },
  {
    id: "iphone-7-plus",
    name: "iPhone 7 Plus",
    basePrice: 89,
    storageOptions: ["32GB", "128GB"],
    colours: ["Black", "Silver", "Gold", "Rose Gold"],
    condition: "Good",
  },
  {
    id: "iphone-7",
    name: "iPhone 7",
    basePrice: 79,
    storageOptions: ["32GB", "128GB"],
    colours: ["Black", "Silver", "Gold", "Rose Gold"],
    condition: "Good",
  },
];
