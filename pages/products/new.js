import Layout from "@/components/Layout";
import axios from "axios";
import { useState } from "react";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";
const NewProduct = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [goToProduct, setGoToProduct] = useState(false);
  const router = useRouter();

  const createProduct = async (e) => {
    e.preventDefault();
    const data = { title, description, price };
    axios.post("/api/products", data);
    setGoToProduct(true);
  };

  if (goToProduct) {
    router.push("/products");
  }

  return (
    <Layout>
      <form onSubmit={createProduct}>
        <h1>New Product</h1>
        <label>Product name</label>
        <input
          type="text"
          placeholder="product name"
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
        />
        <label>Description</label>
        <textarea
          placeholder="description"
          value={description}
          onChange={(e) => setDescription(e.currentTarget.value)}
        />
        <label>Price (in USD)</label>
        <input
          type="number"
          placeholder="price"
          value={price}
          onChange={(e) => setPrice(e.currentTarget.value)}
        />
        <button className="btn-primary" type="submit">
          Save
        </button>
      </form>
    </Layout>
  );
};

export default NewProduct;
