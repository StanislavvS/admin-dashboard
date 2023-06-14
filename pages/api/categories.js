import mongooseConnect from "@/lib/mongooose";
import Category from "@/models/Category";

export default async function handle(req, res) {
  const { method } = req;
  const { name, parentCategory } = req.body;
  await mongooseConnect();

  if (method === "GET") {
    res.json(await Category.find().populate("parent"));
  }

  if (method === "POST") {
    const categoryDoc = await Category.create({ name, parent: parentCategory });
    res.json(categoryDoc);
  }
}
