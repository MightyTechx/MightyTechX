import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import 'dotenv/config'
import contactRouter from './routes/contact'

const app = express()
const PORT = process.env.PORT ?? 5000
const isDev = process.env.NODE_ENV !== 'production'

const buildAllowedOrigins = () => [
  'http://localhost:5173',
  'http://localhost:4173',
  'http://localhost:3000',
  'https://mighty-techx.vercel.app',
  ...(process.env.CLIENT_ORIGIN
    ? process.env.CLIENT_ORIGIN.split(',').map(o => o.trim())
    : []),
].filter(Boolean)

const corsOptions: cors.CorsOptions = {
  origin: (origin, cb) => {
    const allowed = buildAllowedOrigins()
    if (isDev || !origin || allowed.includes(origin)) {
      cb(null, true)
    } else {
      console.warn(`CORS blocked: ${origin} | allowed: ${allowed.join(', ')}`)
      cb(null, false)
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
  console.log(`  Allowed origins: ${buildAllowedOrigins().join(', ')}`)
})
