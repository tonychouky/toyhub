import { CartItem, Product } from "@/types";

export interface CartLine {
  item: CartItem;
  product: Product;
}
