import mongooseConnect from "@/lib/mongooose";
import Product from "@/models/Product";

export default async function hanlder(req, res) {
  const { method } = req;

  if (method === "POST") {
    await mongooseConnect();
    const { title, description, price } = req.body;
    const productDoc = await Product.create({ title, description, price });

    res.json(productDoc);
  } else if (method === "GET") {
    res.json(await Product.find());
  }
}
