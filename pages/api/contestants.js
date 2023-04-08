
import { connectDB } from "@/libs";
import Contestant from "@/Models/concursantes";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      // Conectar a la base de datos
      await connectDB();

      // Crear un nuevo concursante
      const { name, email, phoneNumber, address } = req.body;
      const newContestant = new Contestant({
        name,
        email,
        phoneNumber,
        address,
      });
      const savedContestant = await newContestant.save();

      res.status(201).json(savedContestant);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error creating contestant" });
    }
  }
};

export default handler;
