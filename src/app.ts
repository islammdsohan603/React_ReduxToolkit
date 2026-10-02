const products: {
  id: number;
  name: string;
  price: number;
  size: string;
  orderCount: number;
}[] = [
  { id: 1, name: "T-shirt", price: 20, size: "M", orderCount: 100 },
  { id: 2, name: "Jeans", price: 50, size: "L", orderCount: 200 },
  { id: 3, name: "Sneakers", price: 80, size: "XL", orderCount: 150 },
];

const totalPrice = products.reduce((total, product) => {
  return total + product.price;
}, 0);

console.log(totalPrice);
