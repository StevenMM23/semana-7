import { useState } from 'react';
import axios from 'axios';

const ContestForm = () => {
  // State para los datos del formulario
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    address: '',
  });

  // Handler para actualizar el state de los datos del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handler para enviar el formulario al servidor
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/contestants', formData);
      // Aquí puedes agregar lógica para mostrar un mensaje de éxito o redirigir al usuario a otra página
      console.log(response.data);
    } catch (error) {
      // Aquí puedes agregar lógica para mostrar un mensaje de error
      console.error(error);
    }
  };

  // Handler para generar el reporte RDLC
  const handleReport = async () => {
    try {
      const response = await axios.get('/api/report');
      // Aquí puedes agregar lógica para descargar el reporte o mostrarlo en una nueva página
      console.log(response.data);
    } catch (error) {
      // Aquí puedes agregar lógica para mostrar un mensaje de error
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre:
        <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
      </label>
      <label>
        Email:
        <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
      </label>
      <label>
        Teléfono:
        <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} />
      </label>
      <label>
        Dirección:
        <input type="text" name="address" value={formData.address} onChange={handleInputChange} />
      </label>
      <button type="submit">Enviar</button>
      <button type="button" onClick={handleReport}>Generar reporte</button>
    </form>
  );
};

export default ContestForm;
