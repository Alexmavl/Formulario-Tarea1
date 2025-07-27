import { useState } from "react";

// Definir tipos
type CarModel = 'Ford' | 'Chrysler' | 'Toyota' | 'Nissan';

interface FormData {
  nombre: string;
  apellido: string;
  deportefavorito: string;
  genero: string;
  residente: string;
  isOlder: boolean;
  carModels: Record<CarModel, boolean>;
}

const Form = () => {
  const [formData, setFormData] = useState<FormData>({
    nombre: "",
    apellido: "",
    deportefavorito: "basketball",
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
            [name as CarModel]: checked,
          },
        }));
      } else if (type === "checkbox") {
        setFormData((prev) => ({
          ...prev,
          [name as keyof FormData]: checked,
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          [name as keyof FormData]: value,
        }));
      }
    } else {
      // HTMLSelectElement
      setFormData((prev) => ({
        ...prev,
        [name as keyof FormData]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Simulando el envío - aquí pondrías tu llamada a axios
      console.log("Datos del formulario:", formData);
      alert("Formulario enviado correctamente");
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      alert("Error al enviar el formulario");
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
        {/* Header */}
        <div className="form-header">
          <h2 className="form-title">Actualizar información</h2>
          <p className="form-subtitle">
            Utilice el formulario a continuación para editar su información
          </p>
        </div>

        <div className="form-content" onSubmit={handleSubmit}>
          {/* Información Personal */}
          <div className="form-section personal">
            <h3 className="section-title">📋 Información Personal</h3>
            
            <div className="form-grid">
              <div className="form-field">
                <label className="form-label">Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div className="form-field">
                <label className="form-label">Apellido</label>
                <input
                  type="text"
                  name="apellido"
                  value={formData.apellido}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
            </div>

            {/* Género */}
            <div className="form-field">
              <label className="form-label">Género</label>
              <div className="radio-group">
                {[
                  { value: 'masculino', label: 'Masculino' },
                  { value: 'femenino', label: 'Femenino' },
                  { value: 'otro', label: 'Otro' }
                ].map((option) => (
                  <label 
                    key={option.value} 
                    className={`radio-option ${formData.genero === option.value ? 'selected' : ''}`}
                  >
                    <input
                      type="radio"
                      name="genero"
                      value={option.value}
                      checked={formData.genero === option.value}
                      onChange={handleChange}
                      className="radio-input"
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Preferencias */}
          <div className="form-section preferences">
            <h3 className="section-title">🏆 Preferencias</h3>

            <div className="form-grid">
              <div className="form-field">
                <label className="form-label">Deporte Favorito</label>
                <select
                  name="deportefavorito"
                  value={formData.deportefavorito}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="basketball">Basquet ball</option>
                  <option value="football">Football</option>
                  <option value="tennis">Tennis</option>
                </select>
              </div>

              <div className="form-field">
                <label className="form-label">Residente del Departamento</label>
                <select
                  name="residente"
                  value={formData.residente}
                  onChange={handleChange}
                  className="form-select"
                >
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
              </div>
            </div>
          </div>

          {/* Información Adicional */}
          <div className="form-section additional">
            <h3 className="section-title">🚗 Información Adicional</h3>

            {/* Edad */}
            <label className={`age-checkbox ${formData.isOlder ? 'checked' : ''}`}>
              <input
                type="checkbox"
                name="isOlder"
                checked={formData.isOlder}
                onChange={handleChange}
                className="checkbox-input"
              />
              <span className={`checkbox-indicator ${formData.isOlder ? 'checked' : ''}`}>
                {formData.isOlder && '✓'}
              </span>
              21 años o más
            </label>

            {/* Tipos de automóvil */}
            <div className="form-field">
              <label className="form-label">Tipos de automóvil que posee</label>
              <div className="car-grid">
                {(Object.keys(formData.carModels) as CarModel[]).map((brand) => (
                  <label 
                    key={brand} 
                    className={`car-option ${formData.carModels[brand] ? 'selected' : ''}`}
                  >
                    <input
                      type="checkbox"
                      name={brand}
                      checked={formData.carModels[brand]}
                      onChange={handleChange}
                      className="checkbox-input"
                    />
                    <span className={`car-indicator ${formData.carModels[brand] ? 'selected' : ''}`}>
                      {formData.carModels[brand] && '✓'}
                    </span>
                    {brand}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            onClick={handleSubmit}
            className="submit-button"
          >
            💾 Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
};

export default Form;