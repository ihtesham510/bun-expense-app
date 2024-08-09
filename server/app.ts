import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { serveStatic } from 'hono/bun'
import expenseRoute from './routes/expenses'
const app = new Hono()
app.use('*', logger())

const apiRoute = app.basePath('/api').route('/expenses', expenseRoute)

app.get('*', serveStatic({ root: './client/dist' }))
app.get('*', serveStatic({ path: './client/dist/index.html' }))

export type ApiRoute = typeof apiRoute
export default app
