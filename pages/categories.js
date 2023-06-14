import Layout from "@/components/Layout";
import axios from "axios";
import { useState, useEffect } from "react";

const Categories = () => {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);

  console.log(categories);

  useEffect(() => {
    axios.get(`/api/categories/`).then((result) => {
      setCategories(result.data);
    });
  }, []);

  const saveCategory = async (e) => {
    e.preventDefault();
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
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit" className="btn-primary py-1">
          Save
        </button>
      </form>
      <table className="basic mt-4">
        <thead>
          <tr>
            <td>Category name</td>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 &&
            categories.map((category, index) => (
              <tr key={index}>
                <td>{category.name}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default Categories;
