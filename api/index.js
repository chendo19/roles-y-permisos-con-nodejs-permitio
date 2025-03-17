import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import authRoutes from './routes/auth-routes.js'
import usersRoutes from './routes/users-routes.js'
import postsRoutes from './routes/posts-routes.js'
import commentsRoutes from './routes/comments-routes.js'

dotenv.config()

const app = express()
const port = process.env.API_PORT || 4000

app.use(cors({
  origin: process.env.PUBLIC_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  credentials: true
}))

app.use(express.json())
app.use(cookieParser())

app.get('/', (req, res) => {
  res.json({ message: "API is running..." });
})

app.use('/api/auth', authRoutes)
app.use('/api/users', usersRoutes)
app.use('/api/posts', postsRoutes)
app.use('/api/comments', commentsRoutes)

app.use((err, req, res, next) => {
  const status = err.code || 500
  const message = err.message || 'Something went wrong'
  return res.status(status).json({ message, success: false })
})


mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=${process.env.DB_APP_NAME}`)
//mongoose.connect('mongodb://mongo:27017/permissions-app-db')
//mongoose.connect('mongodb+srv://chendo1988:a2W8l9U4qx3my7IH@permissions-db.bdpl8.mongodb.net/test?retryWrites=true&w=majority&appName=permissions-db')
.then(() => {
    app.listen(port, () => {
      console.log(`API listening on port ${port}`)
    })
  })
  .catch(err => {
    console.log('Mongoose connection error', err)
})