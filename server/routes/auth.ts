import { Hono } from 'hono'
import { kindeClient, sessionManager } from 'server/kinde'

const authRoute = new Hono()
	.get('/login', async c => {
		const loginUrl = await kindeClient.login(sessionManager(c))
		return c.redirect(loginUrl.toString())
	})
	.get('/register', async c => {
		const registerUrl = await kindeClient.register(sessionManager(c))
		return c.redirect(registerUrl.toString())
	})
	.get('/callback', async c => {
		const url = new URL(c.req.url)
		await kindeClient.handleRedirectToApp(sessionManager(c), url)
		return c.redirect('/')
	})
	.get('/logout', async c => {
		await kindeClient.logout(sessionManager(c))
		return c.redirect('/')
	})
	.get('/isauth', async c => {
		const isAuthenticated = await kindeClient.isAuthenticated(sessionManager(c))
		return c.json({ authecticated: isAuthenticated })
	})

export default authRoute
