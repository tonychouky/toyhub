import { Category } from "@/types";

export const categories: Category[] = [
  {
    slug: "building-construction",
    name: "Building & Construction",
    description: "Bricks, blocks, and engineering sets for young builders.",
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800&q=80",
  },
  {
    slug: "cars-vehicles",
    name: "Cars & Vehicles",
    description: "Race cars, trucks, trains, and remote-control rides.",
    image: "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=800&q=80",
  },
  {
    slug: "dolls-figures",
    name: "Dolls & Figures",
    description: "Dolls, action figures, and imaginative playsets.",
    image: "https://images.unsplash.com/photo-1558877385-81a1c7e67d72?w=800&q=80",
  },
  {
    slug: "educational",
    name: "Educational",
    description: "Learning toys that make skill-building fun.",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
  },
  {
    slug: "outdoor",
    name: "Outdoor",
    description: "Get active with balls, ride-ons, and backyard adventures.",
    image: "https://images.unsplash.com/photo-1472162072942-cd5147eb3902?w=800&q=80",
  },
  {
    slug: "games-puzzles",
    name: "Games & Puzzles",
    description: "Board games, card games, and brain-teasing puzzles.",
    image: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&q=80",
  },
  {
    slug: "arts-crafts",
    name: "Arts & Crafts",
    description: "Craft kits, drawing sets, and creative supplies.",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80",
  },
  {
    slug: "stem-science",
    name: "STEM & Science",
    description: "Robotics, chemistry, and hands-on science kits.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
  },
  {
    slug: "baby-toddler",
    name: "Baby & Toddler",
    description: "Soft, safe toys for your littlest ones.",
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800&q=80",
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
