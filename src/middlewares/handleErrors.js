const ERROR_HANDLERS = {
  JsonWebTokenError: res => res.status(401).json({ error: 'Token no encontrado o inválido' }),
  ValidationError: res => res.status(401).json({ error: 'Error de validación de los datos recibidos' }),
  UserDeleted: res => res.status(409).json({ error: 'El usuario ya no existe' }),
  MongoServerError: res => res.status(409).json({ error: 'El usuario ya existe' }),
  TypeError: res => res.status(409).json({ error: 'Ocurrió un error de tipos' }),
  ObjectParameterError: res => res.status(409).json({ error: 'Ocurrió un error 1' }),
  CastError: res => res.status(409).json({ error: 'Ocurrió un error 2' }),
  defaultError: res => res.status(500).end()
}

export default function handleErrors (error, req, res, next) {
  console.log('Desde handleErrors: ', error)

  const handler =
    ERROR_HANDLERS[error.name] || ERROR_HANDLERS.defaultError

  return handler(res)
}
