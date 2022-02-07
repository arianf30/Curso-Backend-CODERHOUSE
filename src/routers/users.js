import { Router } from 'express'
import { loginUser, getAll, signupUser, deleteUser, editUser } from '../controllers/user.js'

const userRouter = new Router()

userRouter.get('/', getAll)
userRouter.post('/login', loginUser)
userRouter.post('/signup', signupUser)
userRouter.delete('/:userId', deleteUser)
userRouter.put('/', editUser)

export default userRouter
