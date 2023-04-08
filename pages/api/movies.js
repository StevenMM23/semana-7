import dbPromise from "./openDb";




export default async function handler(req, res) {
  const db = await dbPromise;

  switch (req.method) {
    case "GET":
      const movies = await db.getAll("my-store");
      res.status(200).json(movies);
      break;
    case "POST":
      const movie = req.body;
      await db.add("my-store", movie);
      res.status(201).json(movie);
      break;
    case "PUT":
      const updatedMovie = req.body;
      await db.put("my-store", updatedMovie);
      res.status(200).json(updatedMovie);
      break;
    case "DELETE":
      const movieId = Number(req.query.id);
      await db.delete("my-store", movieId);
      res.status(204).send("");
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
