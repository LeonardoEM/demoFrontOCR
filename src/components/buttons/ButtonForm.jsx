export function ButtonForm({ tipo, titulo, manejarClic, clases }) {
    // si el boton es submit o si es de otro tipo
  const handleClick = (e) => {
    if (tipo === 'submit') return
    if (typeof manejarClic === 'function') {
      manejarClic(e)
    }
  }

  return (
    <button
      className={clases}
      type={tipo}
      onClick={handleClick}
    >
      {titulo}
    </button>
  )
}

export default ButtonForm