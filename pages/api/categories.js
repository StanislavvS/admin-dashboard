import mongooseConnect from "@/lib/mongooose";
import Category from "@/models/Category";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();

  if (method === "POST") {
    const { name } = req.body;
    console.log(name);

    const categoryDoc = await Category.create({ name });
    res.json(categoryDoc);
  }
}
