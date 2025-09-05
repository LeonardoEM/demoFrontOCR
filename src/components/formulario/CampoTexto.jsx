import { useEffect } from "react";

export function CampoTexto ({ titulo, required, value, placeholder, id, onchange,tipo}) {
  useEffect(() => {
    if (window.M && window.M.updateTextFields) {
      window.M.updateTextFields();
    }
  }, [value]); // actualiza solo cuando el valor cambia

  return (
    <div className="input-field">
      <input
        id={id}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onchange}
        className="validate"
        type={tipo}
      />
      <label htmlFor={id}>{titulo}</label>
    </div>
  );
};

export default CampoTexto;
