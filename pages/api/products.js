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
    if (req.query?.id) {
      res.json(await Product.findOne({ _id: req.query.id }));
    } else {
      res.json(await Product.find());
    }
    res.json(await Product.find());
  } else if (method === "PUT") {
    const { title, description, price, _id } = req.body;

    await Product.updateOne({ _id }, { title, description, price });
    res.json(true);
  } else if (method === "DELETE") {
    if (req.query?.id) {
      await Product.deleteOne({ _id: req.query.id });
      res.json(true);
    }
  }
}
