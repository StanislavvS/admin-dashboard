import Layout from "@/components/Layout";
import { useState } from "react";

const Categories = () => {
  const [name, setName] = useState("");

  const saveCategory = async () => {
    await axios.post(`/api/categories`, { name });
    setName("");
  };

  return (
    <Layout>
      <h1>Categories</h1>
      <label>New Category name</label>

      <form onSubmit={saveCategory} className="flex gap-1">
        <input
          className="mb-0"
          type="text"
          placeholder="Category name"
          value={name}
          onChange={(e) => saveCategory(e.target.value)}
        />
        <button type="submit" className="btn-primary py-1">
          Save
        </button>
      </form>
    </Layout>
  );
};

export default Categories;
