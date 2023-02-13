import { createBirthday } from "../../prisma/BirthdayDev";
import { getSession } from "next-auth/react";
export default async function handle(req, res) {
  // Get the current session data with {user, email, id}
  const session = await getSession({ req });
  // Run if the request was a post request
  if (req.method == "POST") {
    // Get note title & body from the request body
    const { year, name, date } = req.body;
    // Create a new note
    // also pass the session which would be use to get the user information
    const birthday = await createBirthday(year, name, date, session);
    // return created note
    return res.json(birthday);
  }
}
