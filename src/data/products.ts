import { Product } from "@/types";

// Local mock product catalog. In production this file is replaced by calls
// to a real product API/database — see src/services/products.ts for the
// abstraction boundary that makes that swap possible without UI changes.

export const products: Product[] = [
  {
    "id": "p001",
    "name": "MegaBlocks Skyline Tower",
    "brand": "BrickCraft",
    "category": "building-construction",
    "slug": "megablocks-skyline-tower",
    "description": "The MegaBlocks Skyline Tower from BrickCraft brings hours of hands-on play while supporting development for ages 6-8. Thoughtfully designed and rigorously safety-tested, it's built to be a favorite on any toy shelf.",
    "price": 49.99,
    "originalPrice": 64.99,
    "discount": 23,
    "images": [
      "https://picsum.photos/seed/megablocks-skyline-tower-1/900/900",
      "https://picsum.photos/seed/megablocks-skyline-tower-2/900/900",
      "https://picsum.photos/seed/megablocks-skyline-tower-3/900/900"
    ],
    "rating": 3.6,
    "reviewCount": 8,
    "ageRange": "6-8",
    "stock": 34,
    "sku": "BRI-P001",
    "barcode": "194730500000",
    "features": [
      "1,200 interlocking bricks",
      "Glow-in-the-dark rooftop piece",
      "Compatible with major brick brands",
      "Includes 3 mini-figures"
    ],
    "specifications": {
      "Pieces": "1,200",
      "Material": "ABS plastic",
      "Dimensions": "18 x 14 x 22 in (built)"
    },
    "safetyInformation": "Conforms to ASTM F963 and CPSIA safety standards. Adult supervision recommended for children under 3. Please retain packaging for warranty and safety information.",
    "whatsIncluded": [
      "MegaBlocks Skyline Tower",
      "Instruction guide",
      "Warranty card"
    ],
    "isBestSeller": true,
    "isNew": true,
    "createdAt": "2026-09-02T23:12:46.456Z",
    "soldCount": 20
  },
  {
    "id": "p002",
    "name": "Junior Architect Bridge Set",
    "brand": "BuildRight",
    "category": "building-construction",
    "slug": "junior-architect-bridge-set",
    "description": "The Junior Architect Bridge Set from BuildRight brings hours of hands-on play while supporting development for ages 3-5. Thoughtfully designed and rigorously safety-tested, it's built to be a favorite on any toy shelf.",
    "price": 34.99,
    "images": [
      "https://picsum.photos/seed/junior-architect-bridge-set-1/900/900",
      "https://picsum.photos/seed/junior-architect-bridge-set-2/900/900",
      "https://picsum.photos/seed/junior-architect-bridge-set-3/900/900"
    ],
    "rating": 4.5,
    "reviewCount": 61,
    "ageRange": "3-5",
    "stock": 51,
    "sku": "BUI-P002",
    "barcode": "194730500137",
    "features": [
      "Chunky pieces for small hands",
      "Teaches balance & structure",
      "Washable, BPA-free plastic"
    ],
    "specifications": {
      "Pieces": "85",
      "Material": "BPA-free plastic",
      "Recommended Age": "3-5 years"
    },
    "safetyInformation": "Conforms to ASTM F963 and CPSIA safety standards. Adult supervision recommended for children under 3. Please retain packaging for warranty and safety information.",
    "whatsIncluded": [
      "Junior Architect Bridge Set",
      "Instruction guide",
      "Warranty card"
    ],
    "isBestSeller": false,
    "isNew": true,
    "createdAt": "2026-08-20T23:12:46.456Z",
    "soldCount": 111
  },
  {
    "id": "p003",
    "name": "Magnetic Tiles Deluxe 100pc",
    "brand": "TileWorks",
    "category": "building-construction",
    "slug": "magnetic-tiles-deluxe-100pc",
    "description": "The Magnetic Tiles Deluxe 100pc from TileWorks brings hours of hands-on play while supporting development for ages 3-5. Thoughtfully designed and rigorously safety-tested, it's built to be a favorite on any toy shelf.",
    "price": 59.99,
    "originalPrice": 74.99,
    "discount": 20,
    "images": [
      "https://picsum.photos/seed/magnetic-tiles-deluxe-100pc-1/900/900",
      "https://picsum.photos/seed/magnetic-tiles-deluxe-100pc-2/900/900",
      "https://picsum.photos/seed/magnetic-tiles-deluxe-100pc-3/900/900"
    ],
    "rating": 4,
    "reviewCount": 114,
    "ageRange": "3-5",
    "stock": 22,
    "sku": "TIL-P003",
    "barcode": "194730500274",
    "features": [
      "100 translucent magnetic tiles",
      "Builds 2D and 3D shapes",
      "Strengthens fine motor skills"
    ],
    "specifications": {
      "Pieces": "100",
      "Material": "ABS + magnets",
      "Storage": "Includes carry case"
    },
    "safetyInformation": "Conforms to ASTM F963 and CPSIA safety standards. Adult supervision recommended for children under 3. Please retain packaging for warranty and safety information.",
    "whatsIncluded": [
      "Magnetic Tiles Deluxe 100pc",
      "Instruction guide",
      "Warranty card"
    ],
    "isBestSeller": false,
    "isNew": true,
    "createdAt": "2026-08-07T23:12:46.456Z",
    "soldCount": 202
  },
  {
    "id": "p004",
    "name": "Steel Girder Crane Engineering Kit",
    "brand": "IronWorks Jr",
    "category": "building-construction",
    "slug": "steel-girder-crane-engineering-kit",
    "description": "The Steel Girder Crane Engineering Kit from IronWorks Jr brings hours of hands-on play while supporting development for ages 9-12. Thoughtfully designed and rigorously safety-tested, it's built to be a favorite on any toy shelf.",
    "price": 44.5,
    "images": [
      "https://picsum.photos/seed/steel-girder-crane-engineering-kit-1/900/900",
      "https://picsum.photos/seed/steel-girder-crane-engineering-kit-2/900/900",
      "https://picsum.photos/seed/steel-girder-crane-engineering-kit-3/900/900"
    ],
    "rating": 4.9,
    "reviewCount": 167,
    "ageRange": "9-12",
    "stock": 18,
    "sku": "IRO-P004",
    "barcode": "194730500411",
    "features": [
      "Working pulley crane",
      "Real nuts & bolts",
      "STEM engineering guidebook"
    ],
    "specifications": {
      "Pieces": "340",
      "Material": "Die-cast metal & plastic",
      "Motor": "Manual crank"
    },
    "safetyInformation": "Conforms to ASTM F963 and CPSIA safety standards. Adult supervision recommended for children under 3. Please retain packaging for warranty and safety information.",
    "whatsIncluded": [
      "Steel Girder Crane Engineering Kit",
      "Instruction guide",
      "Warranty card"
    ],
    "isBestSeller": false,
    "isNew": false,
    "createdAt": "2026-07-25T23:12:46.456Z",
    "soldCount": 293
  },
  {
    "id": "p005",
    "name": "Castle Kingdom Building Set",
    "brand": "BrickCraft",
    "category": "building-construction",
    "slug": "castle-kingdom-building-set",
    "description": "The Castle Kingdom Building Set from BrickCraft brings hours of hands-on play while supporting development for ages 6-8. Thoughtfully designed and rigorously safety-tested, it's built to be a favorite on any toy shelf.",
    "price": 79.99,
    "originalPrice": 99.99,
    "discount": 20,
    "images": [
      "https://picsum.photos/seed/castle-kingdom-building-set-1/900/900",
      "https://picsum.photos/seed/castle-kingdom-building-set-2/900/900",
      "https://picsum.photos/seed/castle-kingdom-building-set-3/900/900"
    ],
    "rating": 4.4,
    "reviewCount": 220,
    "ageRange": "6-8",
    "stock": 12,
    "sku": "BRI-P005",
    "barcode": "194730500548",
    "features": [
      "Medieval castle with drawbridge",
      "6 knight figures included",
      "Lights up with LED torch pieces"
    ],
    "specifications": {
      "Pieces": "1,580",
      "Material": "ABS plastic"
    },
    "safetyInformation": "Conforms to ASTM F963 and CPSIA safety standards. Adult supervision recommended for children under 3. Please retain packaging for warranty and safety information.",
    "whatsIncluded": [
      "Castle Kingdom Building Set",
      "Instruction guide",
      "Warranty card"
    ],
    "isBestSeller": false,
    "isNew": false,
    "createdAt": "2026-07-12T23:12:46.456Z",
    "soldCount": 384
  },
  {
    "id": "p006",
    "name": "Turbo RC Rally Racer",
    "brand": "SpeedFleet",
    "category": "cars-vehicles",
    "slug": "turbo-rc-rally-racer",
    "description": "The Turbo RC Rally Racer from SpeedFleet brings hours of hands-on play while supporting development for ages 9-12. Thoughtfully designed and rigorously safety-tested, it's built to be a favorite on any toy shelf.",
    "price": 89.99,
    "originalPrice": 119.99,
    "discount": 25,
    "images": [
      "https://picsum.photos/seed/turbo-rc-rally-racer-1/900/900",
      "https://picsum.photos/seed/turbo-rc-rally-racer-2/900/900",
      "https://picsum.photos/seed/turbo-rc-rally-racer-3/900/900"
    ],
    "rating": 3.9,
    "reviewCount": 273,
    "ageRange": "9-12",
    "stock": 27,
    "sku": "SPE-P006",
    "barcode": "194730500685",
    "features": [
      "25 mph top speed",
      "2.4GHz remote, 100ft range",
      "All-terrain suspension",
      "45-min runtime"
    ],
    "specifications": {
      "Battery": "7.4V 1500mAh Li-ion",
      "Charge Time": "90 minutes",
      "Scale": "1:16"
    },
    "safetyInformation": "Conforms to ASTM F963 and CPSIA safety standards. Adult supervision recommended for children under 3. Please retain packaging for warranty and safety information.",
    "whatsIncluded": [
      "Turbo RC Rally Racer",
      "Instruction guide",
      "Warranty card"
    ],
    "isBestSeller": true,
    "isNew": false,
    "createdAt": "2026-06-29T23:12:46.456Z",
    "soldCount": 475
  },
  {
    "id": "p007",
    "name": "Wooden Pull-Along Fire Truck",
    "brand": "Timberkids",
    "category": "cars-vehicles",
    "slug": "wooden-pull-along-fire-truck",
    "description": "The Wooden Pull-Along Fire Truck from Timberkids brings hours of hands-on play while supporting development for ages 0-2. Thoughtfully designed and rigorously safety-tested, it's built to be a favorite on any toy shelf.",
    "price": 24.99,
    "images": [
      "https://picsum.photos/seed/wooden-pull-along-fire-truck-1/900/900",
      "https://picsum.photos/seed/wooden-pull-along-fire-truck-2/900/900",
      "https://picsum.photos/seed/wooden-pull-along-fire-truck-3/900/900"
    ],
    "rating": 4.8,
    "reviewCount": 326,
    "ageRange": "0-2",
    "stock": 60,
    "sku": "TIM-P007",
    "barcode": "194730500822",
    "features": [
      "Sustainably sourced beechwood",
      "No small parts",
      "Chunky pull cord"
    ],
    "specifications": {
      "Material": "Solid beechwood",
      "Paint": "Non-toxic, water-based"
    },
    "safetyInformation": "Conforms to ASTM F963 and CPSIA safety standards. Adult supervision recommended for children under 3. Please retain packaging for warranty and safety information.",
    "whatsIncluded": [
      "Wooden Pull-Along Fire Truck",
      "Instruction guide",
      "Warranty card"
    ],
    "isBestSeller": false,
    "isNew": false,
    "createdAt": "2026-06-16T23:12:46.456Z",
    "soldCount": 566
  },
  {
    "id": "p008",
    "name": "Die-Cast Classic Cars 8-Pack",
    "brand": "MetroWheels",
    "category": "cars-vehicles",
    "slug": "die-cast-classic-cars-8-pack",
    "description": "The Die-Cast Classic Cars 8-Pack from MetroWheels brings hours of hands-on play while supporting development for ages 3-5. Thoughtfully designed and rigorously safety-tested, it's built to be a favorite on any toy shelf.",
    "price": 19.99,
    "images": [
      "https://picsum.photos/seed/die-cast-classic-cars-8-pack-1/900/900",
      "https://picsum.photos/seed/die-cast-classic-cars-8-pack-2/900/900",
      "https://picsum.photos/seed/die-cast-classic-cars-8-pack-3/900/900"
    ],
    "rating": 4.3,
    "reviewCount": 379,
    "ageRange": "3-5",
    "stock": 88,
    "sku": "MET-P008",
    "barcode": "194730500959",
    "features": [
      "8 unique die-cast vehicles",
      "Free-rolling wheels",
      "Durable metal body"
    ],
    "specifications": {
      "Material": "Die-cast metal",
      "Scale": "1:64"
    },
    "safetyInformation": "Conforms to ASTM F963 and CPSIA safety standards. Adult supervision recommended for children under 3. Please retain packaging for warranty and safety information.",
    "whatsIncluded": [
      "Die-Cast Classic Cars 8-Pack",
      "Instruction guide",
      "Warranty card"
    ],
    "isBestSeller": false,
    "isNew": false,
    "createdAt": "2026-06-03T23:12:46.456Z",
    "soldCount": 657
  },
  {
    "id": "p009",
    "name": "Deluxe Train Set with Bridge",
    "brand": "RailKids",
    "category": "cars-vehicles",
    "slug": "deluxe-train-set-with-bridge",
    "description": "The Deluxe Train Set with Bridge from RailKids brings hours of hands-on play while supporting development for ages 3-5. Thoughtfully designed and rigorously safety-tested, it's built to be a favorite on any toy shelf.",
    "price": 64.99,
    "originalPrice": 79.99,
    "discount": 19,
    "images": [
      "https://picsum.photos/seed/deluxe-train-set-with-bridge-1/900/900",
      "https://picsum.photos/seed/deluxe-train-set-with-bridge-2/900/900",
      "https://picsum.photos/seed/deluxe-train-set-with-bridge-3/900/900"
    ],
    "rating": 3.8,
    "reviewCount": 432,
    "ageRange": "3-5",
    "stock": 15,
    "sku": "RAI-P009",
    "barcode": "194730501096",
    "features": [
      "120-piece wooden track",
      "Battery-powered locomotive",
      "Compatible with major wooden rail brands"
    ],
    "specifications": {
      "Pieces": "120",
      "Power": "2x AA batteries (included)"
    },
    "safetyInformation": "Conforms to ASTM F963 and CPSIA safety standards. Adult supervision recommended for children under 3. Please retain packaging for warranty and safety information.",
    "whatsIncluded": [
      "Deluxe Train Set with Bridge",
      "Instruction guide",
      "Warranty card"
    ],
    "isBestSeller": false,
    "isNew": false,
    "createdAt": "2026-05-21T23:12:46.456Z",
    "soldCount": 748
  },
  {
    "id": "p010",
    "name": "Monster Truck Stunt Set",
    "brand": "CrushCrew",
    "category": "cars-vehicles",
    "slug": "monster-truck-stunt-set",
    "description": "The Monster Truck Stunt Set from CrushCrew brings hours of hands-on play while supporting development for ages 6-8. Thoughtfully designed and rigorously safety-tested, it's built to be a favorite on any toy shelf.",
    "price": 39.99,
    "images": [
      "https://picsum.photos/seed/monster-truck-stunt-set-1/900/900",
      "https://picsum.photos/seed/monster-truck-stunt-set-2/900/900",
      "https://picsum.photos/seed/monster-truck-stunt-set-3/900/900"
    ],
    "rating": 4.7,
    "reviewCount": 485,
    "ageRange": "6-8",
    "stock": 40,
    "sku": "CRU-P010",
    "barcode": "194730501233",
    "features": [
      "Launch ramp + loop track",
      "Freewheel monster truck",
      "Easy tool-free assembly"
    ],
    "specifications": {
      "Material": "Plastic",
      "Pieces": "22"
    },
    "safetyInformation": "Conforms to ASTM F963 and CPSIA safety standards. Adult supervision recommended for children under 3. Please retain packaging for warranty and safety information.",
    "whatsIncluded": [
      "Monster Truck Stunt Set",
      "Instruction guide",
      "Warranty card"
    ],
    "isBestSeller": false,
    "isNew": false,
    "createdAt": "2026-05-08T23:12:46.456Z",
    "soldCount": 839
  },
  {
    "id": "p011",
    "name": "Kids Electric Ride-On Jeep",
    "brand": "CruiseLine Jr",
    "category": "cars-vehicles",
    "slug": "kids-electric-ride-on-jeep",
    "description": "The Kids Electric Ride-On Jeep from CruiseLine Jr brings hours of hands-on play while supporting development for ages 3-5. Thoughtfully designed and rigorously safety-tested, it's built to be a favorite on any toy shelf.",
    "price": 199.99,
    "originalPrice": 249.99,
    "discount": 20,
    "images": [
      "https://picsum.photos/seed/kids-electric-ride-on-jeep-1/900/900",
      "https://picsum.photos/seed/kids-electric-ride-on-jeep-2/900/900",
      "https://picsum.photos/seed/kids-electric-ride-on-jeep-3/900/900"
    ],
    "rating": 4.2,
    "reviewCount": 58,
    "ageRange": "3-5",
    "stock": 8,
    "sku": "CRU-P011",
    "barcode": "194730501370",
    "features": [
      "12V motor, 5mph max",
      "Parent remote override",
      "MP3/Bluetooth speaker"
    ],
    "specifications": {
      "Battery": "12V 7Ah",
      "Max Weight": "65 lbs",
      "Charge Time": "8-10 hours"
    },
    "safetyInformation": "Conforms to ASTM F963 and CPSIA safety standards. Adult supervision recommended for children under 3. Please retain packaging for warranty and safety information.",
    "whatsIncluded": [
      "Kids Electric Ride-On Jeep",
      "Instruction guide",
      "Warranty card"
    ],
    "isBestSeller": true,
    "isNew": false,
    "createdAt": "2026-04-25T23:12:46.456Z",
    "soldCount": 30
  },
  {
    "id": "p012",
    "name": "Sunshine Friends Fashion Doll",
    "brand": "PlayPals",
    "category": "dolls-figures",
    "slug": "sunshine-friends-fashion-doll",
    "description": "The Sunshine Friends Fashion Doll from PlayPals brings hours of hands-on play while supporting development for ages 3-5. Thoughtfully designed and rigorously safety-tested, it's built to be a favorite on any toy shelf.",
    "price": 16.99,
    "images": [
      "https://picsum.photos/seed/sunshine-friends-fashion-doll-1/900/900",
      "https://picsum.photos/seed/sunshine-friends-fashion-doll-2/900/900",
      "https://picsum.photos/seed/sunshine-friends-fashion-doll-3/900/900"
    ],
    "rating": 3.7,
    "reviewCount": 111,
    "ageRange": "3-5",
    "stock": 75,
    "sku": "PLA-P012",
    "barcode": "194730501507",
    "features": [
      "11 points of articulation",
      "Removable outfit & shoes",
      "Brushable hair"
    ],
    "specifications": {
      "Height": "11.5 in",
      "Material": "Vinyl & fabric"
    },
    "safetyInformation": "Conforms to ASTM F963 and CPSIA safety standards. Adult supervision recommended for children under 3. Please retain packaging for warranty and safety information.",
    "whatsIncluded": [
      "Sunshine Friends Fashion Doll",
      "Instruction guide",
      "Warranty card"
    ],
    "isBestSeller": false,
    "isNew": false,
    "createdAt": "2026-04-12T23:12:46.457Z",
    "soldCount": 121
  },
  {
    "id": "p013",
    "name": "Galactic Guardians Action Figure Set",
    "brand": "HeroForge",
    "category": "dolls-figures",
    "slug": "galactic-guardians-action-figure-set",
    "description": "The Galactic Guardians Action Figure Set from HeroForge brings hours of hands-on play while supporting development for ages 6-8. Thoughtfully designed and rigorously safety-tested, it's built to be a favorite on any toy shelf.",
    "price": 29.99,
    "images": [
      "https://picsum.photos/seed/galactic-guardians-action-figure-set-1/900/900",
      "https://picsum.photos/seed/galactic-guardians-action-figure-set-2/900/900",
      "https://picsum.photos/seed/galactic-guardians-action-figure-set-3/900/900"
    ],
    "rating": 4.6,
    "reviewCount": 164,
    "ageRange": "6-8",
    "stock": 33,
    "sku": "HER-P013",
    "barcode": "194730501644",
    "features": [
      "5 poseable figures",
      "Interchangeable weapons",
      "Display stand included"
    ],
    "specifications": {
      "Figures": "5",
      "Height": "4-6 in each"
    },
    "safetyInformation": "Conforms to ASTM F963 and CPSIA safety standards. Adult supervision recommended for children under 3. Please retain packaging for warranty and safety information.",
    "whatsIncluded": [
      "Galactic Guardians Action Figure Set",
      "Instruction guide",
      "Warranty card"
    ],
    "isBestSeller": false,
    "isNew": false,
    "createdAt": "2026-03-30T23:12:46.457Z",
    "soldCount": 212
  },
  {
    "id": "p014",
    "name": "Dreamhouse Family Playset",
    "brand": "PlayPals",
    "category": "dolls-figures",
    "slug": "dreamhouse-family-playset",
    "description": "The Dreamhouse Family Playset from PlayPals brings hours of hands-on play while supporting development for ages 6-8. Thoughtfully designed and rigorously safety-tested, it's built to be a favorite on any toy shelf.",
    "price": 89.99,
    "originalPrice": 109.99,
    "discount": 18,
    "images": [
      "https://picsum.photos/seed/dreamhouse-family-playset-1/900/900",
      "https://picsum.photos/seed/dreamhouse-family-playset-2/900/900",
      "https://picsum.photos/seed/dreamhouse-family-playset-3/900/900"
    ],
    "rating": 4.1,
    "reviewCount": 217,
    "ageRange": "6-8",
    "stock": 14,
    "sku": "PLA-P014",
    "barcode": "194730501781",
    "features": [
      "3-story dollhouse",
      "15 furniture pieces",
      "Working elevator"
    ],
    "specifications": {
      "Rooms": "6",
      "Material": "Plastic & fabric"
    },
    "safetyInformation": "Conforms to ASTM F963 and CPSIA safety standards. Adult supervision recommended for children under 3. Please retain packaging for warranty and safety information.",
    "whatsIncluded": [
      "Dreamhouse Family Playset",
      "Instruction guide",
      "Warranty card"
    ],
    "isBestSeller": false,
    "isNew": false,
    "createdAt": "2026-03-17T23:12:46.457Z",
    "soldCount": 303
  },
  {
    "id": "p015",
    "name": "Baby Doll with Feeding Set",
    "brand": "TinyTots",
    "category": "dolls-figures",
    "slug": "baby-doll-with-feeding-set",
    "description": "The Baby Doll with Feeding Set from TinyTots brings hours of hands-on play while supporting development for ages 3-5. Thoughtfully designed and rigorously safety-tested, it's built to be a favorite on any toy shelf.",
    "price": 34.99,
    "images": [
      "https://picsum.photos/seed/baby-doll-with-feeding-set-1/900/900",
      "https://picsum.photos/seed/baby-doll-with-feeding-set-2/900/900",
      "https://picsum.photos/seed/baby-doll-with-feeding-set-3/900/900"
    ],
    "rating": 3.6,
    "reviewCount": 270,
    "ageRange": "3-5",
    "stock": 46,
    "sku": "TIN-P015",
    "barcode": "194730501918",
    "features": [
      "Soft-body baby doll",
      "Realistic feeding accessories",
      "Machine washable"
    ],
    "specifications": {
      "Height": "14 in",
      "Material": "Vinyl & soft fill"
    },
    "safetyInformation": "Conforms to ASTM F963 and CPSIA safety standards. Adult supervision recommended for children under 3. Please retain packaging for warranty and safety information.",
    "whatsIncluded": [
      "Baby Doll with Feeding Set",
      "Instruction guide",
      "Warranty card"
    ],
    "isBestSeller": false,
    "isNew": false,
    "createdAt": "2026-03-04T23:12:46.457Z",
    "soldCount": 394
  },
  {
    "id": "p016",
    "name": "Mythical Creatures Figure Collection",
    "brand": "HeroForge",
    "category": "dolls-figures",
    "slug": "mythical-creatures-figure-collection",
    "description": "The Mythical Creatures Figure Collection from HeroForge brings hours of hands-on play while supporting development for ages 6-8. Thoughtfully designed and rigorously safety-tested, it's built to be a favorite on any toy shelf.",
    "price": 22.99,
    "images": [
      "https://picsum.photos/seed/mythical-creatures-figure-collection-1/900/900",
      "https://picsum.photos/seed/mythical-creatures-figure-collection-2/900/900",
      "https://picsum.photos/seed/mythical-creatures-figure-collection-3/900/900"
    ],
    "rating": 4.5,
    "reviewCount": 323,
    "ageRange": "6-8",
    "stock": 51,
    "sku": "HER-P016",
    "barcode": "194730502055",
    "features": [
      "6 hand-painted figures",
      "Glow-in-the-dark dragon",
      "Collector card included"
    ],
    "specifications": {
      "Figures": "6",
      "Material": "PVC"
    },
    "safetyInformation": "Conforms to ASTM F963 and CPSIA safety standards. Adult supervision recommended for children under 3. Please retain packaging for warranty and safety information.",
    "whatsIncluded": [
      "Mythical Creatures Figure Collection",
      "Instruction guide",
      "Warranty card"
    ],
    "isBestSeller": true,
    "isNew": false,
    "createdAt": "2026-02-19T23:12:46.457Z",
    "soldCount": 485
  },
  {
    "id": "p017",
    "name": "Alphabet Learning Tablet",
    "brand": "BrightMinds",
    "category": "educational",
    "slug": "alphabet-learning-tablet",
    "description": "The Alphabet Learning Tablet from BrightMinds brings hours of hands-on play while supporting development for ages 3-5. Thoughtfully designed and rigorously safety-tested, it's built to be a favorite on any toy shelf.",
    "price": 27.99,
    "images": [
      "https://picsum.photos/seed/alphabet-learning-tablet-1/900/900",
      "https://picsum.photos/seed/alphabet-learning-tablet-2/900/900",
      "https://picsum.photos/seed/alphabet-learning-tablet-3/900/900"
    ],
    "rating": 4,
    "reviewCount": 376,
    "ageRange": "3-5",
    "stock": 62,
    "sku": "BRI-P017",
    "barcode": "194730502192",
    "features": [
      "120+ songs, letters & numbers",
      "Volume control",
      "Auto shut-off"
    ],
    "specifications": {
      "Battery": "3x AAA (included)",
      "Language": "English & Spanish"
    },
    "safetyInformation": "Conforms to ASTM F963 and CPSIA safety standards. Adult supervision recommended for children under 3. Please retain packaging for warranty and safety information.",
    "whatsIncluded": [
      "Alphabet Learning Tablet",
      "Instruction guide",
      "Warranty card"
    ],
    "isBestSeller": false,
    "isNew": true,
    "createdAt": "2026-08-25T23:12:46.457Z",
    "soldCount": 576
  },
  {
    "id": "p018",
    "name": "World Map Puzzle & Atlas",
    "brand": "GeoKids",
    "category": "educational",
    "slug": "world-map-puzzle-atlas",
    "description": "The World Map Puzzle & Atlas from GeoKids brings hours of hands-on play while supporting development for ages 6-8. Thoughtfully designed and rigorously safety-tested, it's built to be a favorite on any toy shelf.",
    "price": 21.99,
    "images": [
      "https://picsum.photos/seed/world-map-puzzle-atlas-1/900/900",
      "https://picsum.photos/seed/world-map-puzzle-atlas-2/900/900",
      "https://picsum.photos/seed/world-map-puzzle-atlas-3/900/900"
    ],
    "rating": 4.9,
    "reviewCount": 429,
    "ageRange": "6-8",
    "stock": 40,
    "sku": "GEO-P018",
    "barcode": "194730502329",
    "features": [
      "Country-shaped pieces",
      "Companion atlas booklet",
      "Durable wood construction"
    ],
    "specifications": {
      "Pieces": "68",
      "Material": "Wood"
    },
    "safetyInformation": "Conforms to ASTM F963 and CPSIA safety standards. Adult supervision recommended for children under 3. Please retain packaging for warranty and safety information.",
    "whatsIncluded": [
      "World Map Puzzle & Atlas",
      "Instruction guide",
      "Warranty card"
    ],
    "isBestSeller": false,
    "isNew": true,
    "createdAt": "2026-08-12T23:12:46.457Z",
    "soldCount": 667
  },
  {
    "id": "p019",
    "name": "Fraction & Math Manipulatives Set",
    "brand": "BrightMinds",
    "category": "educational",
    "slug": "fraction-math-manipulatives-set",
    "description": "The Fraction & Math Manipulatives Set from BrightMinds brings hours of hands-on play while supporting development for ages 6-8. Thoughtfully designed and rigorously safety-tested, it's built to be a favorite on any toy shelf.",
    "price": 18.5,
    "images": [
      "https://picsum.photos/seed/fraction-math-manipulatives-set-1/900/900",
      "https://picsum.photos/seed/fraction-math-manipulatives-set-2/900/900",
      "https://picsum.photos/seed/fraction-math-manipulatives-set-3/900/900"
    ],
    "rating": 4.4,
    "reviewCount": 482,
    "ageRange": "6-8",
    "stock": 55,
    "sku": "BRI-P019",
    "barcode": "194730502466",
    "features": [
      "Color-coded fraction tiles",
      "Teacher activity guide",
      "Storage tray included"
    ],
    "specifications": {
      "Pieces": "51",
      "Material": "Durable plastic"
    },
    "safetyInformation": "Conforms to ASTM F963 and CPSIA safety standards. Adult supervision recommended for children under 3. Please retain packaging for warranty and safety information.",
    "whatsIncluded": [
      "Fraction & Math Manipulatives Set",
      "Instruction guide",
      "Warranty card"
    ],
    "isBestSeller": false,
    "isNew": false,
    "createdAt": "2026-07-30T23:12:46.457Z",
    "soldCount": 758
  },
  {
    "id": "p020",
    "name": "Sight Words Flash Card Game",
    "brand": "LearnPlay",
    "category": "educational",
    "slug": "sight-words-flash-card-game",
    "description": "The Sight Words Flash Card Game from LearnPlay brings hours of hands-on play while supporting development for ages 6-8. Thoughtfully designed and rigorously safety-tested, it's built to be a favorite on any toy shelf.",
    "price": 12.99,
    "images": [
      "https://picsum.photos/seed/sight-words-flash-card-game-1/900/900",
      "https://picsum.photos/seed/sight-words-flash-card-game-2/900/900",
      "https://picsum.photos/seed/sight-words-flash-card-game-3/900/900"
    ],
    "rating": 3.9,
    "reviewCount": 55,
    "ageRange": "6-8",
    "stock": 90,
    "sku": "LEA-P020",
    "barcode": "194730502603",
    "features": [
      "300 sight word cards",
      "3 game modes",
      "Curriculum-aligned"
    ],
    "specifications": {
      "Cards": "300",
      "Material": "Coated cardstock"
    },
    "safetyInformation": "Conforms to ASTM F963 and CPSIA safety standards. Adult supervision recommended for children under 3. Please retain packaging for warranty and safety information.",
    "whatsIncluded": [
      "Sight Words Flash Card Game",
      "Instruction guide",
      "Warranty card"
    ],
    "isBestSeller": false,
    "isNew": false,
    "createdAt": "2026-07-17T23:12:46.457Z",
    "soldCount": 849
  },
  {
    "id": "p021",
    "name": "Bilingual Talking Globe",
    "brand": "GeoKids",
    "category": "educational",
    "slug": "bilingual-talking-globe",
    "description": "The Bilingual Talking Globe from GeoKids brings hours of hands-on play while supporting development for ages 9-12. Thoughtfully designed and rigorously safety-tested, it's built to be a favorite on any toy shelf.",
    "price": 39.99,
    "originalPrice": 49.99,
    "discount": 20,
    "images": [
      "https://picsum.photos/seed/bilingual-talking-globe-1/900/900",
      "https://picsum.photos/seed/bilingual-talking-globe-2/900/900",
      "https://picsum.photos/seed/bilingual-talking-globe-3/900/900"
    ],
    "rating": 4.8,
    "reviewCount": 108,
    "ageRange": "9-12",
    "stock": 19,
    "sku": "GEO-P021",
    "barcode": "194730502740",
    "features": [
      "Interactive stylus pen",
      "Countries, capitals & flags quiz",
      "English/French audio"
    ],
    "specifications": {
      "Diameter": "10 in",
      "Power": "USB rechargeable"
    },
    "safetyInformation": "Conforms to ASTM F963 and CPSIA safety standards. Adult supervision recommended for children under 3. Please retain packaging for warranty and safety information.",
    "whatsIncluded": [
      "Bilingual Talking Globe",
      "Instruction guide",
      "Warranty card"
    ],
    "isBestSeller": true,
    "isNew": false,
    "createdAt": "2026-07-04T23:12:46.457Z",
    "soldCount": 40
  },
  {
    "id": "p022",
    "name": "Junior Trampoline with Handle",
    "brand": "BounceZone",
    "category": "outdoor",
    "slug": "junior-trampoline-with-handle",
    "description": "The Junior Trampoline with Handle from BounceZone brings hours of hands-on play while supporting development for ages 3-5. Thoughtfully designed and rigorously safety-tested, it's built to be a favorite on any toy shelf.",
    "price": 69.99,
    "images": [
      "https://picsum.photos/seed/junior-trampoline-with-handle-1/900/900",
      "https://picsum.photos/seed/junior-trampoline-with-handle-2/900/900",
      "https://picsum.photos/seed/junior-trampoline-with-handle-3/900/900"
    ],
    "rating": 4.3,
    "reviewCount": 161,
    "ageRange": "3-5",
    "stock": 20,
    "sku": "BOU-P022",
    "barcode": "194730502877",
    "features": [
      "36-inch bounce mat",
      "Padded safety handle",
      "Non-slip feet"
    ],
    "specifications": {
      "Weight Limit": "100 lbs",
      "Diameter": "36 in"
    },
    "safetyInformation": "Conforms to ASTM F963 and CPSIA safety standards. Adult supervision recommended for children under 3. Please retain packaging for warranty and safety information.",
    "whatsIncluded": [
      "Junior Trampoline with Handle",
      "Instruction guide",
      "Warranty card"
    ],
    "isBestSeller": false,
    "isNew": false,
    "createdAt": "2026-06-21T23:12:46.457Z",
    "soldCount": 131
  },
  {
    "id": "p023",
    "name": "Water Balloon Blast Set",
    "brand": "SplashCo",
    "category": "outdoor",
    "slug": "water-balloon-blast-set",
    "description": "The Water Balloon Blast Set from SplashCo brings hours of hands-on play while supporting development for ages 6-8. Thoughtfully designed and rigorously safety-tested, it's built to be a favorite on any toy shelf.",
    "price": 14.99,
    "images": [
      "https://picsum.photos/seed/water-balloon-blast-set-1/900/900",
      "https://picsum.photos/seed/water-balloon-blast-set-2/900/900",
      "https://picsum.photos/seed/water-balloon-blast-set-3/900/900"
    ],
    "rating": 3.8,
    "reviewCount": 214,
    "ageRange": "6-8",
    "stock": 100,
    "sku": "SPL-P023",
    "barcode": "194730503014",
    "features": [
      "Fills 100 balloons in 60 seconds",
      "Includes balloons",
      "No-tie design"
    ],
    "specifications": {
      "Balloons Included": "250"
    },
    "safetyInformation": "Conforms to ASTM F963 and CPSIA safety standards. Adult supervision recommended for children under 3. Please retain packaging for warranty and safety information.",
    "whatsIncluded": [
      "Water Balloon Blast Set",
      "Instruction guide",
      "Warranty card"
    ],
    "isBestSeller": false,
    "isNew": false,
    "createdAt": "2026-06-08T23:12:46.457Z",
    "soldCount": 222
  },
  {
    "id": "p024",
    "name": "Kids Two-Wheel Balance Bike",
    "brand": "PedalPals",
    "category": "outdoor",
    "slug": "kids-two-wheel-balance-bike",
    "description": "The Kids Two-Wheel Balance Bike from PedalPals brings hours of hands-on play while supporting development for ages 3-5. Thoughtfully designed and rigorously safety-tested, it's built to be a favorite on any toy shelf.",
    "price": 74.99,
    "originalPrice": 89.99,
    "discount": 17,
    "images": [
      "https://picsum.photos/seed/kids-two-wheel-balance-bike-1/900/900",
      "https://picsum.photos/seed/kids-two-wheel-balance-bike-2/900/900",
      "https://picsum.photos/seed/kids-two-wheel-balance-bike-3/900/900"
    ],
    "rating": 4.7,
    "reviewCount": 267,
    "ageRange": "3-5",
    "stock": 25,
    "sku": "PED-P024",
    "barcode": "194730503151",
    "features": [
      "Lightweight steel frame",
      "Adjustable seat height",
      "Puncture-proof tires"
    ],
    "specifications": {
      "Weight": "7.5 lbs",
      "Seat Height": "13-16 in"
    },
    "safetyInformation": "Conforms to ASTM F963 and CPSIA safety standards. Adult supervision recommended for children under 3. Please retain packaging for warranty and safety information.",
    "whatsIncluded": [
      "Kids Two-Wheel Balance Bike",
      "Instruction guide",
      "Warranty card"
    ],
    "isBestSeller": false,
    "isNew": false,
    "createdAt": "2026-05-26T23:12:46.457Z",
    "soldCount": 313
  },
  {
    "id": "p025",
    "name": "Backyard Bounce Sprinkler Pad",
    "brand": "SplashCo",
    "category": "outdoor",
    "slug": "backyard-bounce-sprinkler-pad",
    "description": "The Backyard Bounce Sprinkler Pad from SplashCo brings hours of hands-on play while supporting development for ages 3-5. Thoughtfully designed and rigorously safety-tested, it's built to be a favorite on any toy shelf.",
    "price": 44.99,
    "images": [
      "https://picsum.photos/seed/backyard-bounce-sprinkler-pad-1/900/900",
      "https://picsum.photos/seed/backyard-bounce-sprinkler-pad-2/900/900",
      "https://picsum.photos/seed/backyard-bounce-sprinkler-pad-3/900/900"
    ],
    "rating": 4.2,
    "reviewCount": 320,
    "ageRange": "3-5",
    "stock": 16,
    "sku": "SPL-P025",
    "barcode": "194730503288",
    "features": [
      "Inflatable splash pad + sprinkler",
      "Quick-connect garden hose",
      "UV-resistant PVC"
    ],
    "specifications": {
      "Diameter": "70 in",
      "Material": "PVC"
    },
    "safetyInformation": "Conforms to ASTM F963 and CPSIA safety standards. Adult supervision recommended for children under 3. Please retain packaging for warranty and safety information.",
    "whatsIncluded": [
      "Backyard Bounce Sprinkler Pad",
      "Instruction guide",
      "Warranty card"
    ],
    "isBestSeller": false,
    "isNew": false,
    "createdAt": "2026-05-13T23:12:46.457Z",
    "soldCount": 404
  },
  {
    "id": "p026",
    "name": "Championship Soccer Goal Set",
    "brand": "FieldPlay",
    "category": "outdoor",
    "slug": "championship-soccer-goal-set",
    "description": "The Championship Soccer Goal Set from FieldPlay brings hours of hands-on play while supporting development for ages 6-8. Thoughtfully designed and rigorously safety-tested, it's built to be a favorite on any toy shelf.",
    "price": 54.99,
    "images": [
      "https://picsum.photos/seed/championship-soccer-goal-set-1/900/900",
      "https://picsum.photos/seed/championship-soccer-goal-set-2/900/900",
      "https://picsum.photos/seed/championship-soccer-goal-set-3/900/900"
    ],
    "rating": 3.7,
    "reviewCount": 373,
    "ageRange": "6-8",
    "stock": 30,
    "sku": "FIE-P026",
    "barcode": "194730503425",
    "features": [
      "2 folding goals + ball",
      "Carry bag included",
      "5-minute setup"
    ],
    "specifications": {
      "Goal Size": "6 x 4 ft",
      "Material": "Fiberglass poles"
    },
    "safetyInformation": "Conforms to ASTM F963 and CPSIA safety standards. Adult supervision recommended for children under 3. Please retain packaging for warranty and safety information.",
    "whatsIncluded": [
      "Championship Soccer Goal Set",
      "Instruction guide",
      "Warranty card"
    ],
    "isBestSeller": true,
    "isNew": false,
    "createdAt": "2026-04-30T23:12:46.457Z",
    "soldCount": 495
  },
  {
    "id": "p027",
    "name": "Galaxy Explorers Board Game",
    "brand": "TableTop Traditions",
    "category": "games-puzzles",
    "slug": "galaxy-explorers-board-game",
    "description": "The Galaxy Explorers Board Game from TableTop Traditions brings hours of hands-on play while supporting development for ages 9-12. Thoughtfully designed and rigorously safety-tested, it's built to be a favorite on any toy shelf.",
    "price": 32.99,
    "images": [
      "https://picsum.photos/seed/galaxy-explorers-board-game-1/900/900",
      "https://picsum.photos/seed/galaxy-explorers-board-game-2/900/900",
      "https://picsum.photos/seed/galaxy-explorers-board-game-3/900/900"
    ],
    "rating": 4.6,
    "reviewCount": 426,
    "ageRange": "9-12",
    "stock": 28,
    "sku": "TAB-P027",
    "barcode": "194730503562",
    "features": [
      "2-4 players",
      "45-60 min playtime",
      "Cooperative & competitive modes"
    ],
    "specifications": {
      "Players": "2-4",
      "Playtime": "45-60 min"
    },
    "safetyInformation": "Conforms to ASTM F963 and CPSIA safety standards. Adult supervision recommended for children under 3. Please retain packaging for warranty and safety information.",
    "whatsIncluded": [
      "Galaxy Explorers Board Game",
      "Instruction guide",
      "Warranty card"
    ],
    "isBestSeller": false,
    "isNew": false,
    "createdAt": "2026-04-17T23:12:46.457Z",
    "soldCount": 586
  },
  {
    "id": "p028",
    "name": "1000-Piece Enchanted Forest Puzzle",
    "brand": "PuzzleCraft",
    "category": "games-puzzles",
    "slug": "1000-piece-enchanted-forest-puzzle",
    "description": "The 1000-Piece Enchanted Forest Puzzle from PuzzleCraft brings hours of hands-on play while supporting development for ages 13+. Thoughtfully designed and rigorously safety-tested, it's built to be a favorite on any toy shelf.",
    "price": 15.99,
    "images": [
      "https://picsum.photos/seed/1000-piece-enchanted-forest-puzzle-1/900/900",
      "https://picsum.photos/seed/1000-piece-enchanted-forest-puzzle-2/900/900",
      "https://picsum.photos/seed/1000-piece-enchanted-forest-puzzle-3/900/900"
    ],
    "rating": 4.1,
    "reviewCount": 479,
    "ageRange": "13+",
    "stock": 44,
    "sku": "PUZ-P028",
    "barcode": "194730503699",
    "features": [
      "Finished size 27x20 in",
      "Randomly cut pieces",
      "Poster guide included"
    ],
    "specifications": {
      "Pieces": "1,000",
      "Finished Size": "27 x 20 in"
    },
    "safetyInformation": "Conforms to ASTM F963 and CPSIA safety standards. Adult supervision recommended for children under 3. Please retain packaging for warranty and safety information.",
    "whatsIncluded": [
      "1000-Piece Enchanted Forest Puzzle",
      "Instruction guide",
      "Warranty card"
    ],
    "isBestSeller": false,
    "isNew": false,
    "createdAt": "2026-04-04T23:12:46.457Z",
    "soldCount": 677
  },
  {
    "id": "p029",
    "name": "Stack & Topple Tower Game",
    "brand": "TableTop Traditions",
    "category": "games-puzzles",
    "slug": "stack-topple-tower-game",
    "description": "The Stack & Topple Tower Game from TableTop Traditions brings hours of hands-on play while supporting development for ages 6-8. Thoughtfully designed and rigorously safety-tested, it's built to be a favorite on any toy shelf.",
    "price": 17.99,
    "images": [
      "https://picsum.photos/seed/stack-topple-tower-game-1/900/900",
      "https://picsum.photos/seed/stack-topple-tower-game-2/900/900",
      "https://picsum.photos/seed/stack-topple-tower-game-3/900/900"
    ],
    "rating": 3.6,
    "reviewCount": 52,
    "ageRange": "6-8",
    "stock": 65,
    "sku": "TAB-P029",
    "barcode": "194730503836",
    "features": [
      "54 wooden blocks",
      "Fast-paced family fun",
      "Travel case included"
    ],
    "specifications": {
      "Pieces": "54",
      "Material": "Solid pine"
    },
    "safetyInformation": "Conforms to ASTM F963 and CPSIA safety standards. Adult supervision recommended for children under 3. Please retain packaging for warranty and safety information.",
    "whatsIncluded": [
      "Stack & Topple Tower Game",
      "Instruction guide",
      "Warranty card"
    ],
    "isBestSeller": false,
    "isNew": false,
    "createdAt": "2026-03-22T23:12:46.457Z",
    "soldCount": 768
  },
  {
    "id": "p030",
    "name": "Word Detective Card Game",
    "brand": "BrainSpark",
    "category": "games-puzzles",
    "slug": "word-detective-card-game",
    "description": "The Word Detective Card Game from BrainSpark brings hours of hands-on play while supporting development for ages 9-12. Thoughtfully designed and rigorously safety-tested, it's built to be a favorite on any toy shelf.",
    "price": 11.99,
    "images": [
      "https://picsum.photos/seed/word-detective-card-game-1/900/900",
      "https://picsum.photos/seed/word-detective-card-game-2/900/900",
      "https://picsum.photos/seed/word-detective-card-game-3/900/900"
    ],
    "rating": 4.5,
    "reviewCount": 105,
    "ageRange": "9-12",
    "stock": 70,
    "sku": "BRA-P030",
    "barcode": "194730503973",
    "features": [
      "Builds vocabulary & deduction skills",
      "2-6 players",
      "Quick 15-min rounds"
    ],
    "specifications": {
      "Players": "2-6",
      "Cards": "120"
    },
    "safetyInformation": "Conforms to ASTM F963 and CPSIA safety standards. Adult supervision recommended for children under 3. Please retain packaging for warranty and safety information.",
    "whatsIncluded": [
      "Word Detective Card Game",
      "Instruction guide",
      "Warranty card"
    ],
    "isBestSeller": false,
    "isNew": false,
    "createdAt": "2026-03-09T23:12:46.457Z",
    "soldCount": 859
  },
  {
    "id": "p031",
    "name": "Wooden Chess & Checkers Set",
    "brand": "PuzzleCraft",
    "category": "games-puzzles",
    "slug": "wooden-chess-checkers-set",
    "description": "The Wooden Chess & Checkers Set from PuzzleCraft brings hours of hands-on play while supporting development for ages 9-12. Thoughtfully designed and rigorously safety-tested, it's built to be a favorite on any toy shelf.",
    "price": 26.99,
    "originalPrice": 32.99,
    "discount": 18,
    "images": [
      "https://picsum.photos/seed/wooden-chess-checkers-set-1/900/900",
      "https://picsum.photos/seed/wooden-chess-checkers-set-2/900/900",
      "https://picsum.photos/seed/wooden-chess-checkers-set-3/900/900"
    ],
    "rating": 4,
    "reviewCount": 158,
    "ageRange": "9-12",
    "stock": 37,
    "sku": "PUZ-P031",
    "barcode": "194730504110",
    "features": [
      "Folding wooden board",
      "Weighted pieces",
      "Storage compartment"
    ],
    "specifications": {
      "Board Size": "15 x 15 in",
      "Material": "Wood"
    },
    "safetyInformation": "Conforms to ASTM F963 and CPSIA safety standards. Adult supervision recommended for children under 3. Please retain packaging for warranty and safety information.",
    "whatsIncluded": [
      "Wooden Chess & Checkers Set",
      "Instruction guide",
      "Warranty card"
    ],
    "isBestSeller": true,
    "isNew": false,
    "createdAt": "2026-02-24T23:12:46.457Z",
    "soldCount": 50
  },
  {
    "id": "p032",
    "name": "Deluxe 150-Piece Art Studio",
    "brand": "CreativeKids",
    "category": "arts-crafts",
    "slug": "deluxe-150-piece-art-studio",
    "description": "The Deluxe 150-Piece Art Studio from CreativeKids brings hours of hands-on play while supporting development for ages 6-8. Thoughtfully designed and rigorously safety-tested, it's built to be a favorite on any toy shelf.",
    "price": 42.99,
    "originalPrice": 54.99,
    "discount": 22,
    "images": [
      "https://picsum.photos/seed/deluxe-150-piece-art-studio-1/900/900",
      "https://picsum.photos/seed/deluxe-150-piece-art-studio-2/900/900",
      "https://picsum.photos/seed/deluxe-150-piece-art-studio-3/900/900"
    ],
    "rating": 4.9,
    "reviewCount": 211,
    "ageRange": "6-8",
    "stock": 24,
    "sku": "CRE-P032",
    "barcode": "194730504247",
    "features": [
      "Crayons, markers, paints & pastels",
      "Portable wooden easel case",
      "Non-toxic, washable"
    ],
    "specifications": {
      "Pieces": "150",
      "Case Material": "Wood"
    },
    "safetyInformation": "Conforms to ASTM F963 and CPSIA safety standards. Adult supervision recommended for children under 3. Please retain packaging for warranty and safety information.",
    "whatsIncluded": [
      "Deluxe 150-Piece Art Studio",
      "Instruction guide",
      "Warranty card"
    ],
    "isBestSeller": false,
    "isNew": true,
    "createdAt": "2026-08-30T23:12:46.457Z",
    "soldCount": 141
  },
  {
    "id": "p033",
    "name": "Friendship Bracelet Maker Kit",
    "brand": "CraftJoy",
    "category": "arts-crafts",
    "slug": "friendship-bracelet-maker-kit",
    "description": "The Friendship Bracelet Maker Kit from CraftJoy brings hours of hands-on play while supporting development for ages 6-8. Thoughtfully designed and rigorously safety-tested, it's built to be a favorite on any toy shelf.",
    "price": 19.99,
    "images": [
      "https://picsum.photos/seed/friendship-bracelet-maker-kit-1/900/900",
      "https://picsum.photos/seed/friendship-bracelet-maker-kit-2/900/900",
      "https://picsum.photos/seed/friendship-bracelet-maker-kit-3/900/900"
    ],
    "rating": 4.4,
    "reviewCount": 264,
    "ageRange": "6-8",
    "stock": 58,
    "sku": "CRA-P033",
    "barcode": "194730504384",
    "features": [
      "Loom + 500 beads & threads",
      "Instruction booklet",
      "Storage box"
    ],
    "specifications": {
      "Beads": "500",
      "Threads": "20 colors"
    },
    "safetyInformation": "Conforms to ASTM F963 and CPSIA safety standards. Adult supervision recommended for children under 3. Please retain packaging for warranty and safety information.",
    "whatsIncluded": [
      "Friendship Bracelet Maker Kit",
      "Instruction guide",
      "Warranty card"
    ],
    "isBestSeller": false,
    "isNew": true,
    "createdAt": "2026-08-17T23:12:46.457Z",
    "soldCount": 232
  },
  {
    "id": "p034",
    "name": "Pottery Wheel Studio for Kids",
    "brand": "ClayCraft",
    "category": "arts-crafts",
    "slug": "pottery-wheel-studio-for-kids",
    "description": "The Pottery Wheel Studio for Kids from ClayCraft brings hours of hands-on play while supporting development for ages 9-12. Thoughtfully designed and rigorously safety-tested, it's built to be a favorite on any toy shelf.",
    "price": 47.99,
    "images": [
      "https://picsum.photos/seed/pottery-wheel-studio-for-kids-1/900/900",
      "https://picsum.photos/seed/pottery-wheel-studio-for-kids-2/900/900",
      "https://picsum.photos/seed/pottery-wheel-studio-for-kids-3/900/900"
    ],
    "rating": 3.9,
    "reviewCount": 317,
    "ageRange": "9-12",
    "stock": 13,
    "sku": "CLA-P034",
    "barcode": "194730504521",
    "features": [
      "Motorized spinning wheel",
      "Air-dry clay included",
      "Splash guard"
    ],
    "specifications": {
      "Power": "4x C batteries",
      "Clay Included": "2 lbs"
    },
    "safetyInformation": "Conforms to ASTM F963 and CPSIA safety standards. Adult supervision recommended for children under 3. Please retain packaging for warranty and safety information.",
    "whatsIncluded": [
      "Pottery Wheel Studio for Kids",
      "Instruction guide",
      "Warranty card"
    ],
    "isBestSeller": false,
    "isNew": true,
    "createdAt": "2026-08-04T23:12:46.457Z",
    "soldCount": 323
  },
  {
    "id": "p035",
    "name": "Washable Finger Paint Set",
    "brand": "CreativeKids",
    "category": "arts-crafts",
    "slug": "washable-finger-paint-set",
    "description": "The Washable Finger Paint Set from CreativeKids brings hours of hands-on play while supporting development for ages 0-2. Thoughtfully designed and rigorously safety-tested, it's built to be a favorite on any toy shelf.",
    "price": 13.99,
    "images": [
      "https://picsum.photos/seed/washable-finger-paint-set-1/900/900",
      "https://picsum.photos/seed/washable-finger-paint-set-2/900/900",
      "https://picsum.photos/seed/washable-finger-paint-set-3/900/900"
    ],
    "rating": 4.8,
    "reviewCount": 370,
    "ageRange": "0-2",
    "stock": 80,
    "sku": "CRE-P035",
    "barcode": "194730504658",
    "features": [
      "6 vibrant washable colors",
      "Non-toxic formula",
      "Includes finger-paint paper pad"
    ],
    "specifications": {
      "Colors": "6",
      "Volume": "2 oz each"
    },
    "safetyInformation": "Conforms to ASTM F963 and CPSIA safety standards. Adult supervision recommended for children under 3. Please retain packaging for warranty and safety information.",
    "whatsIncluded": [
      "Washable Finger Paint Set",
      "Instruction guide",
      "Warranty card"
    ],
    "isBestSeller": false,
    "isNew": false,
    "createdAt": "2026-07-22T23:12:46.457Z",
    "soldCount": 414
  },
  {
    "id": "p036",
    "name": "Robotics Engineering Kit",
    "brand": "CircuitKids",
    "category": "stem-science",
    "slug": "robotics-engineering-kit",
    "description": "The Robotics Engineering Kit from CircuitKids brings hours of hands-on play while supporting development for ages 9-12. Thoughtfully designed and rigorously safety-tested, it's built to be a favorite on any toy shelf.",
    "price": 69.99,
    "originalPrice": 89.99,
    "discount": 22,
    "images": [
      "https://picsum.photos/seed/robotics-engineering-kit-1/900/900",
      "https://picsum.photos/seed/robotics-engineering-kit-2/900/900",
      "https://picsum.photos/seed/robotics-engineering-kit-3/900/900"
    ],
    "rating": 4.3,
    "reviewCount": 423,
    "ageRange": "9-12",
    "stock": 21,
    "sku": "CIR-P036",
    "barcode": "194730504795",
    "features": [
      "Build 12 different robots",
      "App-based coding lessons",
      "Reusable motor & sensor pack"
    ],
    "specifications": {
      "Models": "12",
      "Power": "USB rechargeable battery"
    },
    "safetyInformation": "Conforms to ASTM F963 and CPSIA safety standards. Adult supervision recommended for children under 3. Please retain packaging for warranty and safety information.",
    "whatsIncluded": [
      "Robotics Engineering Kit",
      "Instruction guide",
      "Warranty card"
    ],
    "isBestSeller": true,
    "isNew": false,
    "createdAt": "2026-07-09T23:12:46.457Z",
    "soldCount": 505
  },
  {
    "id": "p037",
    "name": "Crystal Growing Science Lab",
    "brand": "LabSpark",
    "category": "stem-science",
    "slug": "crystal-growing-science-lab",
    "description": "The Crystal Growing Science Lab from LabSpark brings hours of hands-on play while supporting development for ages 9-12. Thoughtfully designed and rigorously safety-tested, it's built to be a favorite on any toy shelf.",
    "price": 24.99,
    "images": [
      "https://picsum.photos/seed/crystal-growing-science-lab-1/900/900",
      "https://picsum.photos/seed/crystal-growing-science-lab-2/900/900",
      "https://picsum.photos/seed/crystal-growing-science-lab-3/900/900"
    ],
    "rating": 3.8,
    "reviewCount": 476,
    "ageRange": "9-12",
    "stock": 35,
    "sku": "LAB-P037",
    "barcode": "194730504932",
    "features": [
      "Grow 3 vibrant crystals",
      "Safe, non-toxic compounds",
      "Full lab guidebook"
    ],
    "specifications": {
      "Crystals": "3",
      "Growth Time": "5-7 days"
    },
    "safetyInformation": "Conforms to ASTM F963 and CPSIA safety standards. Adult supervision recommended for children under 3. Please retain packaging for warranty and safety information.",
    "whatsIncluded": [
      "Crystal Growing Science Lab",
      "Instruction guide",
      "Warranty card"
    ],
    "isBestSeller": false,
    "isNew": false,
    "createdAt": "2026-06-26T23:12:46.457Z",
    "soldCount": 596
  },
  {
    "id": "p038",
    "name": "Solar System Planetarium Kit",
    "brand": "OrbitLabs",
    "category": "stem-science",
    "slug": "solar-system-planetarium-kit",
    "description": "The Solar System Planetarium Kit from OrbitLabs brings hours of hands-on play while supporting development for ages 9-12. Thoughtfully designed and rigorously safety-tested, it's built to be a favorite on any toy shelf.",
    "price": 32.99,
    "images": [
      "https://picsum.photos/seed/solar-system-planetarium-kit-1/900/900",
      "https://picsum.photos/seed/solar-system-planetarium-kit-2/900/900",
      "https://picsum.photos/seed/solar-system-planetarium-kit-3/900/900"
    ],
    "rating": 4.7,
    "reviewCount": 49,
    "ageRange": "9-12",
    "stock": 26,
    "sku": "ORB-P038",
    "barcode": "194730505069",
    "features": [
      "Motorized rotating planets",
      "Glow-in-the-dark stars",
      "Projects onto ceiling"
    ],
    "specifications": {
      "Power": "3x AA batteries",
      "Planets": "8 + sun"
    },
    "safetyInformation": "Conforms to ASTM F963 and CPSIA safety standards. Adult supervision recommended for children under 3. Please retain packaging for warranty and safety information.",
    "whatsIncluded": [
      "Solar System Planetarium Kit",
      "Instruction guide",
      "Warranty card"
    ],
    "isBestSeller": false,
    "isNew": false,
    "createdAt": "2026-06-13T23:12:46.457Z",
    "soldCount": 687
  },
  {
    "id": "p039",
    "name": "Beginner Coding Robot",
    "brand": "CircuitKids",
    "category": "stem-science",
    "slug": "beginner-coding-robot",
    "description": "The Beginner Coding Robot from CircuitKids brings hours of hands-on play while supporting development for ages 6-8. Thoughtfully designed and rigorously safety-tested, it's built to be a favorite on any toy shelf.",
    "price": 54.99,
    "images": [
      "https://picsum.photos/seed/beginner-coding-robot-1/900/900",
      "https://picsum.photos/seed/beginner-coding-robot-2/900/900",
      "https://picsum.photos/seed/beginner-coding-robot-3/900/900"
    ],
    "rating": 4.2,
    "reviewCount": 102,
    "ageRange": "6-8",
    "stock": 30,
    "sku": "CIR-P039",
    "barcode": "194730505206",
    "features": [
      "Screen-free coding blocks",
      "Teaches sequencing logic",
      "Rechargeable battery"
    ],
    "specifications": {
      "Battery": "USB-C rechargeable",
      "Runtime": "90 minutes"
    },
    "safetyInformation": "Conforms to ASTM F963 and CPSIA safety standards. Adult supervision recommended for children under 3. Please retain packaging for warranty and safety information.",
    "whatsIncluded": [
      "Beginner Coding Robot",
      "Instruction guide",
      "Warranty card"
    ],
    "isBestSeller": false,
    "isNew": false,
    "createdAt": "2026-05-31T23:12:46.457Z",
    "soldCount": 778
  },
  {
    "id": "p040",
    "name": "Soft Stacking Rings Toy",
    "brand": "TinyTots",
    "category": "baby-toddler",
    "slug": "soft-stacking-rings-toy",
    "description": "The Soft Stacking Rings Toy from TinyTots brings hours of hands-on play while supporting development for ages 0-2. Thoughtfully designed and rigorously safety-tested, it's built to be a favorite on any toy shelf.",
    "price": 12.99,
    "images": [
      "https://picsum.photos/seed/soft-stacking-rings-toy-1/900/900",
      "https://picsum.photos/seed/soft-stacking-rings-toy-2/900/900",
      "https://picsum.photos/seed/soft-stacking-rings-toy-3/900/900"
    ],
    "rating": 3.7,
    "reviewCount": 155,
    "ageRange": "0-2",
    "stock": 95,
    "sku": "TIN-P040",
    "barcode": "194730505343",
    "features": [
      "BPA-free soft plastic",
      "Teaches size & color sorting",
      "Easy to clean"
    ],
    "specifications": {
      "Pieces": "7 rings + base",
      "Material": "BPA-free plastic"
    },
    "safetyInformation": "Conforms to ASTM F963 and CPSIA safety standards. Adult supervision recommended for children under 3. Please retain packaging for warranty and safety information.",
    "whatsIncluded": [
      "Soft Stacking Rings Toy",
      "Instruction guide",
      "Warranty card"
    ],
    "isBestSeller": false,
    "isNew": false,
    "createdAt": "2026-05-18T23:12:46.457Z",
    "soldCount": 869
  },
  {
    "id": "p041",
    "name": "Plush Musical Elephant",
    "brand": "CuddleCo",
    "category": "baby-toddler",
    "slug": "plush-musical-elephant",
    "description": "The Plush Musical Elephant from CuddleCo brings hours of hands-on play while supporting development for ages 0-2. Thoughtfully designed and rigorously safety-tested, it's built to be a favorite on any toy shelf.",
    "price": 22.99,
    "images": [
      "https://picsum.photos/seed/plush-musical-elephant-1/900/900",
      "https://picsum.photos/seed/plush-musical-elephant-2/900/900",
      "https://picsum.photos/seed/plush-musical-elephant-3/900/900"
    ],
    "rating": 4.6,
    "reviewCount": 208,
    "ageRange": "0-2",
    "stock": 70,
    "sku": "CUD-P041",
    "barcode": "194730505480",
    "features": [
      "Plays 8 lullabies",
      "Ultra-soft minky fabric",
      "Machine washable"
    ],
    "specifications": {
      "Height": "12 in",
      "Power": "2x AA batteries (included)"
    },
    "safetyInformation": "Conforms to ASTM F963 and CPSIA safety standards. Adult supervision recommended for children under 3. Please retain packaging for warranty and safety information.",
    "whatsIncluded": [
      "Plush Musical Elephant",
      "Instruction guide",
      "Warranty card"
    ],
    "isBestSeller": true,
    "isNew": false,
    "createdAt": "2026-05-05T23:12:46.457Z",
    "soldCount": 60
  },
  {
    "id": "p042",
    "name": "Sensory Activity Cube",
    "brand": "TinyTots",
    "category": "baby-toddler",
    "slug": "sensory-activity-cube",
    "description": "The Sensory Activity Cube from TinyTots brings hours of hands-on play while supporting development for ages 0-2. Thoughtfully designed and rigorously safety-tested, it's built to be a favorite on any toy shelf.",
    "price": 29.99,
    "originalPrice": 36.99,
    "discount": 19,
    "images": [
      "https://picsum.photos/seed/sensory-activity-cube-1/900/900",
      "https://picsum.photos/seed/sensory-activity-cube-2/900/900",
      "https://picsum.photos/seed/sensory-activity-cube-3/900/900"
    ],
    "rating": 4.1,
    "reviewCount": 261,
    "ageRange": "0-2",
    "stock": 42,
    "sku": "TIN-P042",
    "barcode": "194730505617",
    "features": [
      "5 sides of sensory activities",
      "Rounded, safe edges",
      "Develops fine motor skills"
    ],
    "specifications": {
      "Material": "BPA-free plastic",
      "Dimensions": "8x8x8 in"
    },
    "safetyInformation": "Conforms to ASTM F963 and CPSIA safety standards. Adult supervision recommended for children under 3. Please retain packaging for warranty and safety information.",
    "whatsIncluded": [
      "Sensory Activity Cube",
      "Instruction guide",
      "Warranty card"
    ],
    "isBestSeller": false,
    "isNew": false,
    "createdAt": "2026-04-22T23:12:46.457Z",
    "soldCount": 151
  }
];
