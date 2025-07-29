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
      setFormData((prev) => ({
        ...prev,
        [name as keyof FormData]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const form = document.createElement('form');
    form.action = "https://script.google.com/macros/s/AKfycbySl9x-qanaGYFQjyJnJlHmVx7Ft6vwsicNqiA9xcVpClW-uXK33KEownjdFQujbWE/exec";
    form.method = "POST";
    form.style.display = "none";

    const addField = (name: string, value: string) => {
      const input = document.createElement('input');
      input.name = name;
      input.value = value;
      form.appendChild(input);
    };

    addField("nombre", formData.nombre);
    addField("apellido", formData.apellido);
    addField("deportefavorito", formData.deportefavorito);
    addField("genero", formData.genero);
    addField("residente", formData.residente);
    addField("isOlder", formData.isOlder ? "1" : "0");
    addField("Ford", formData.carModels.Ford ? "1" : "0");
    addField("Toyota", formData.carModels.Toyota ? "1" : "0");
    addField("Chrysler", formData.carModels.Chrysler ? "1" : "0");
    addField("Nissan", formData.carModels.Nissan ? "1" : "0");

    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <div className="form-header">
          <h2 className="form-title">Actualizar información</h2>
          <p className="form-subtitle">
            Utilice el formulario a continuación para editar su información
          </p>
        </div>

        <form className="form-content" onSubmit={handleSubmit}>
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

            <div className="form-field">
              <label className="form-label">Género</label>
              <div className="radio-group">
                {['masculino', 'femenino', 'otro'].map((option) => (
                  <label key={option} className={`radio-option ${formData.genero === option ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="genero"
                      value={option}
                      checked={formData.genero === option}
                      onChange={handleChange}
                      className="radio-input"
                    />
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </label>
                ))}
              </div>
            </div>
          </div>

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
                  <option value="basketball">Basketball</option>
                  <option value="football">Fútbol</option>
                  <option value="tennis">Tenis</option>
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
                  {["Guatemala", "Santa Rosa", "Jutiapa", "Escuintla", "Suchitepequez", "Quetzaltenango", "San Marcos", "Huehuetenango", "Quiche", "Alta Verapaz", "Baja Verapaz", "El Progreso", "Chiquimula", "Zacapa", "Izabal", "Petén"].map(dep => (
                    <option key={dep} value={dep}>{dep}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="form-section additional">
            <h3 className="section-title">🚗 Información Adicional</h3>

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

          <button type="submit" className="submit-button">
            💾 Guardar Cambios
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
