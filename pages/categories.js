import Layout from "@/components/Layout";
import axios from "axios";
import { useState, useEffect } from "react";

const Categories = () => {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [parentCategory, setParentCategory] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    axios.get(`/api/categories/`).then((result) => {
      setCategories(result.data);
    });
  };

  const saveCategory = async (e) => {
    e.preventDefault();
    await axios.post(`/api/categories`, { name, parentCategory });
    setName("");
    fetchCategories();
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
          onChange={(e) => setName(e.target.value)}
        />
        <select
          className="mb-0"
          onChange={(e) => setParentCategory(e.target.value)}
        >
          {" "}
          <option value={0}> No parent category</option>
          {categories.length > 0 &&
            categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
        </select>
        <button type="submit" className="btn-primary py-1">
          Save
        </button>
      </form>
      <table className="basic mt-4">
        <thead>
          <tr>
            <td>Category name</td>
            <td>Parent category</td>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 &&
            categories.map((category, index) => (
              <tr key={index}>
                <td>{category.name}</td>
                <td>{category?.parent?.name}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default Categories;
