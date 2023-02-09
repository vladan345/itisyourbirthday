import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("test");

    const users = await db.collection("Users").find({}).toArray();
    res.json(users);
  } catch (e) {
    console.error(e);
  }
}
