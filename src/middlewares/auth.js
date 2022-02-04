const ADMIN = false

const isAdmin = (req, res, next) => {
  if (ADMIN) {
    next()
  } else {
    res
      .status(401)
      .json({
        error: -1,
        descripcion: `Ruta ${req.path}. Método ${req.method} no autorizado.`
      })
  }
}

export default isAdmin
