import app from './app'
const server = Bun.serve({
	port: process.env.PORT,
	fetch: app.fetch,
})
console.log(`server running on http://localhost:${server.port}`)
