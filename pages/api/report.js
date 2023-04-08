import { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '@/libs';
import Contestant from '@/Models/concursantes';
import jsreport from '@/jsreportapp/server';

const handler = async (req, res) => {
  if (req.method === 'GET') {
    try {
      // Conectar a la base de datos
      await connectDB();

      // Obtener los datos de los concursantes desde la base de datos
      const contestants = await Contestant.find();

      // Crear un objeto de instancia de jsreport
      const jsr = jsreport();

      // Iniciar la instancia de jsreport
      await jsr.init();

      // Renderizar el reporte utilizando jsreport
      const report = await jsr.render({
        template: {
          content: '<h1>Contestants Report</h1><table>{{#each contestants}}<tr><td>{{this.name}}</td><td>{{this.email}}</td><td>{{this.phoneNumber}}</td><td>{{this.address}}</td><td>{{this.createdAt}}</td></tr>{{/each}}</table>',
          engine: 'handlebars',
          recipe: 'chrome-pdf',
        },
        data: {
          contestants,
        },
      });

      // Configurar los headers de la respuesta para descargar el archivo
      res.setHeader('Content-Disposition', `attachment; filename=contestants-report.pdf`);
      res.setHeader('Content-Type', 'application/pdf');

      // Enviar el reporte como una respuesta de la API
      res.send(report.content);

      // Finalizar la instancia de jsreport
      await jsr.close();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error generating report' });
    }
  }
};

export default handler;
