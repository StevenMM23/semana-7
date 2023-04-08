import Movie from "@/Models/movieSchema";
import { connectDB } from "@/libs";

export default async function handler(req, res) {
  const { method } = req;
  
  await connectDB();

  switch (method) {
    case "GET":
      try {
        const movies = await Movie.find({});
        res.status(200).json({ success: true, data: movies });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;

    case "POST":
      try {
        const { title, year, awards } = req.body;

        const myMovie = { title, year, awards };
        const movie = await Movie.create(myMovie);

        res.status(201).json({ success: true, data: movie });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
