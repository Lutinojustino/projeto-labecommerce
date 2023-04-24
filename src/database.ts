/* import { CATEGORY, User, Product, Purchase } from "./type";

export const usuario: User[] = [
  {
    id: "21",
    email: "ljustinojsantos@gmail.com",
    password: "ljustino",
  },
  
  {
    id: "14",
    email: "lucasjustinodossantos@gmail.com",
    password: "sernum",
  },
];

export const produtos: Product[] = [
  {
    id: "51",
    name: "Pasta Térmica",
    price: 15.00,
    category: CATEGORY.ELECTRONICS,
  },
  {
    id: "53",
    name: "Fone",
    price: 20.00,
    category: CATEGORY.ELECTRONICS,
  },
];

export const carroDeCompra: Purchase[] = [
  {
    userId: "21",
    productId: "51",
    quantity: 1,
    totalPrice: 15,
  },
  {
    userId: "14",
    productId: "53",
    quantity: 1,
    totalPrice: 20,
  },
];

export function createUser(
  id: string,
  email: string,
  password: string
): string {
  usuario.push({ id, email, password });
  return "Cadastro realizado com sucesso";
}

export function createProduct(
  id: string,
  name: string,
  price: number,
  category: CATEGORY
): string {
  produtos.push({ id, name, price, category });
  return "Produto adicionado com sucesso";
}

export function getAllUsers(): User[] {
  return usuario;
}

export function getAllProducts(): Product[] {
  return produtos;
}

export function getProduct(idToSearch: string): Product | undefined {
  return produtos.find((prod) => prod.id === idToSearch);
}

export function createPurchase(
  userId: string,
  productId: string,
  quantity: number,
  totalPrice: number
): string {
  carroDeCompra.push({ userId, productId, quantity, totalPrice });
  return "Compra realizada com sucesso";
}

export function queryProductsByName(q: string): Product[] {
  return produtos.filter((prod) =>
    prod.name.toLowerCase().includes(q.toLowerCase())
  );
}

export function getAllPurchasesFromUserId(userIdToSearch: string): Purchase[] {
  return carroDeCompra.filter((purchase) => purchase.userId === userIdToSearch);
}
 */