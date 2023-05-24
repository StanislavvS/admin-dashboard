import Layout from "@/components/Layout";
import axios from "axios";
import { useState } from "react";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";
import ProdctForm from "@/components/ProductsForm";
const NewProduct = () => {
  return (
    <Layout>
      <h1>New Product</h1>
      <ProdctForm />
    </Layout>
  );
};

export default NewProduct;
