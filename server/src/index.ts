import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import compression from 'compression'
import rateLimit from 'express-rate-limit'
import 'dotenv/config'

import contactRouter from './routes/contact'
import analyticsRouter from './routes/analytics'
import { initDb } from './utils/db'

const app = express()
const PORT = process.env.PORT ?? 5000
const isDev = process.env.NODE_ENV !== 'production'

/**
 * ✅ Allowed Origins (FIXED: now treated as ARRAY, not function)
 */
const allowedOrigins: string[] = [
  'http://localhost:5173',
  'http://localhost:4173',
  'http://localhost:3000',
  'https://mighty-techx.vercel.app',
  ...(process.env.CLIENT_ORIGIN
    ? process.env.CLIENT_ORIGIN.split(',').map(o => o.trim())
    : []),
].filter(Boolean)

console.log('Allowed origins:', allowedOrigins)

/**
 * ✅ CORS Configuration
 */
const corsOptions: cors.CorsOptions = {
  origin: (origin, cb) => {
    if (isDev || !origin || allowedOrigins.includes(origin)) {
      cb(null, true)
    } else {
      console.warn(`CORS blocked: ${origin}`)
      cb(null, false)
    }
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: true,
}

/**
 * ✅ Middlewares
 */
app.use(compression())

// Important: handle preflight BEFORE routes
app.options('*', cors(corsOptions))

app.use(cors(corsOptions))
app.use(express.json())

/**
 * ✅ Rate Limiter (Contact API)
 */
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { message: 'Too many requests. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
})

/**
 * ✅ Routes
 */
app.use('/api/contact', limiter, contactRouter)
app.use('/api/analytics', analyticsRouter)

/**
 * ✅ Health Check
 */
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    env: isDev ? 'dev' : 'prod',
  })
})

/**
 * ✅ Global Error Handler
 */
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Unhandled error:', err.message)
  res.status(500).json({ message: 'Internal server error' })
})

/**
 * ✅ Initialize DB
 */
initDb()

/**
 * ✅ Start Server
 */
app.listen(PORT, () => {
  console.log(`✓ Server running on http://localhost:${PORT}`)
  console.log(`Allowed origins: ${allowedOrigins.join(', ')}`)
})