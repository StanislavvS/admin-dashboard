import mongooseConnect from "@/lib/mongooose";
import Category from "@/models/Category";

export default async function handle(req, res) {
  const { method } = req;
  const { name, parentCategory, _id } = req.body;
  await mongooseConnect();

  if (method === "GET") {
    res.json(await Category.find().populate("parent"));
  }

  if (method === "POST") {
    const categoryDoc = await Category.create({
      name,
      parent: parentCategory || undefined,
    });
    res.json(categoryDoc);
  }

  if (method === "PUT") {
    const categoryDoc = await Category.updateOne(
      { _id },
      {
        name,
        parent: parentCategory || undefined,
      }
    );

    res.json(categoryDoc);
  }
}
