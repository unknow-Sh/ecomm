import Header from "@/components/Header";
import ProductList from "@/components/ProductList";
import React from "react";

async function getProducts() {
  const res = await fetch("http://localhost:3000/api/product", {
    cache: "no-store",
  });
  return res.json();
}

const page = async () => {
  const result = await getProducts();
  const products = result.data;

  return (
    <>
      <Header />
      <ProductList products={products} />
    </>
  );
};

export default page;
