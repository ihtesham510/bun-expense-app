import { hc } from 'hono/client'
import { ApiRoute } from '@server/app'
const client = hc<ApiRoute>('/')
const api = client.api
export default api
