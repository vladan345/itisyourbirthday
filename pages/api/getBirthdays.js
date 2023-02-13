import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("test");

    const birthdays = await db.collection("BirthdayDev").find({}).toArray();
    res.json(birthdays);
  } catch (e) {
    console.error(e);
  }
}
