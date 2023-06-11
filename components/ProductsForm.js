import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

const ProductForm = ({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
  images,
}) => {
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [price, setPrice] = useState(existingPrice || "");
  const [goToProduct, setGoToProduct] = useState(false);
  const router = useRouter();

  const saveProduct = async (e) => {
    e.preventDefault();
    const data = { title, description, price };

    if (_id) {
      await axios.put(`/api/products/`, { ...data, _id });
    } else {
      axios.post("/api/products", data);
    }
    setGoToProduct(true);
  };

  if (goToProduct) {
    router.push("/products");
  }

  const uploadImages = async (e) => {
    const files = e.target?.files;

    if (files) {
      const formData = new FormData();

      for (const file of files) {
        formData.append("file", file);
      }

      const res = await axios.post("/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    }
  };

  return (
    <form onSubmit={saveProduct}>
      <h1>New Product</h1>
      <label>Product name</label>
      <input
        type="text"
        placeholder="product name"
        value={title}
        onChange={(e) => setTitle(e.currentTarget.value)}
      />
      <label>Photos</label>
      <div className="mb-2">
        <label className="w-24 h-24  text-center flex items-center cursor-pointer justify-center text-sm gap-1 text-gray-500 rounded-lg bg-gray-200 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
          <div>Upload</div>
          <input type="file" className="hidden" onChange={uploadImages}></input>
        </label>
        {!images?.length && <div>No photos in this product.</div>}
      </div>
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
  );
};

export default ProductForm;
