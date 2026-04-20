import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import 'dotenv/config'
import contactRouter from './routes/contact'

const app = express()
const PORT = process.env.PORT ?? 5000
const isDev = process.env.NODE_ENV !== 'production'

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:4173',
  'http://localhost:3000',
  process.env.CLIENT_ORIGIN,
].filter(Boolean) as string[]

const corsOptions: cors.CorsOptions = {
  origin: (origin, cb) => {
    // In dev allow all; in prod check whitelist
    if (isDev || !origin || allowedOrigins.includes(origin)) {
      cb(null, true)
    } else {
      cb(null, false)   // reject — never throw, that causes 500
    }
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: true,
}

// Must be before any routes — handles CORS preflight (OPTIONS)
app.options('*', cors(corsOptions))
app.use(cors(corsOptions))
app.use(express.json())

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { message: 'Too many requests. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
})

app.use('/api/contact', limiter, contactRouter)

app.get('/api/health', (_req, res) => res.json({ status: 'ok', env: isDev ? 'dev' : 'prod' }))

// Global error handler — prevents unhandled errors from crashing on 500
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Unhandled error:', err.message)
  res.status(500).json({ message: 'Internal server error' })
})

app.listen(PORT, () => {
  console.log(`✓ Server running on http://localhost:${PORT}`)
  console.log(`  Allowed origins: ${allowedOrigins.join(', ')}`)
})
