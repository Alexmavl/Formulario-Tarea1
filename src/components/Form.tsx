import { useState } from "react";
import axios from "axios";

const Form = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    deportefavorito: "basquet ball",
    genero: "",
    residente: "Guatemala",
    isOlder: false,
    carModels: {
      Ford: false,
      Chrysler: false,
      Toyota: false,
      Nissan: false,
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  const target = e.target;
  const name = target.name;
  const value = target.value;

  if (target instanceof HTMLInputElement) {
    const { type, checked } = target;

    if (name in formData.carModels) {
      setFormData((prev) => ({
        ...prev,
        carModels: {
          ...prev.carModels,
          [name]: checked,
        },
      }));
    } else if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  } else {
    // HTMLSelectElement
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/save", formData);
      alert("Formulario enviado correctamente");
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      alert("Error al enviar el formulario");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Actualizar información</h2>
      <p>Utilice el formulario a continuación para editar su información</p>

      <div>
        <label>
          Nombre:
          <input type="text" name="Nombre" value={formData.nombre} onChange={handleChange} />
        </label>
      </div>

      <div>
        <label>
          Apellido:
          <input type="text" name="Apellido" value={formData.apellido} onChange={handleChange} />
        </label>
      </div>

      <div>
        <label>
          Deporte Favorito:
          <select name="deportefavorito" value={formData.deportefavorito} onChange={handleChange}>
            <option value="basketball">Basquet ball</option>
            <option value="football">Football</option>
            <option value="tennis">Tennis</option>
          </select>
        </label>
      </div>

      <div>
        Genero:
        <label>
          <input type="radio" name="genero" value="masculino" onChange={handleChange} /> Maculino
        </label>
        <label>
          <input type="radio" name="genero" value="femenino" onChange={handleChange} /> Femenino
        </label>
        <label>
          <input type="radio" name="genero" value="otro" onChange={handleChange} /> Otro
        </label>
      </div>

      <div>
        <label>
          Residente del Departamento:
          <select name="Residente" value={formData.residente} onChange={handleChange}>
            <option value="Guatemala">Guatemala</option>
            <option value="Santa Rosa">Santa Rosa</option>
            <option value="Jutiapa">Jutiapa</option>
            <option value="Escuintla">Escuintla</option>
            <option value="Suchitepequez">Suchitepequez</option>
            <option value="Quetzaltenango">Quetzaltenango</option>
            <option value="San Marcos">San Marcos</option>
            <option value="Huehuetenango">Huehuetenango</option>
            <option value="Quiche">Quiché</option>
            <option value="Alta Verapaz">Alta Verapaz</option>
            <option value="Baja Verapaz">Baja Verapaz</option>
            <option value="El Progeso">El Progreso</option>
            <option value="Chiquimula">Chiquimula</option>
            <option value="Zacapa">Zacapa</option>
            <option value="Izabal">Izabal</option>
            <option value="Petén">Petén</option>

          </select>
        </label>
      </div>

      <div>
        <label>
          <input type="checkbox" name="isOlder" checked={formData.isOlder} onChange={handleChange} />
          21 años o mas
        </label>
      </div>

      <div>
        Tipos de automovil que posee:
        <label>
          <input type="checkbox" name="Ford" checked={formData.carModels.Ford} onChange={handleChange} /> Ford
        </label>
        <label>
          <input type="checkbox" name="Chrysler" checked={formData.carModels.Chrysler} onChange={handleChange} /> Chrysler
        </label>
        <label>
          <input type="checkbox" name="Toyota" checked={formData.carModels.Toyota} onChange={handleChange} /> Toyota
        </label>
        <label>
          <input type="checkbox" name="Nissan" checked={formData.carModels.Nissan} onChange={handleChange} /> Nissan
        </label>
      </div>

      <button type="submit">Guardar Cambios</button>
    </form>
  );
};

export default Form;
