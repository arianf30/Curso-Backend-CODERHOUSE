import jsonwebtoken from 'jsonwebtoken'

export default function userExtractor (req, res, next) {
  const authorization = req.get('authorization')
  let token = ''
  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    token = authorization.substring(7)
  }

  const decodeToken = jsonwebtoken.verify(token, process.env.SECRET)

  if (!token || !decodeToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }
  const { id: userId } = decodeToken
  req.userId = userId

  next()
}
