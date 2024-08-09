import {
	createKindeServerClient,
	GrantType,
	type SessionManager,
} from '@kinde-oss/kinde-typescript-sdk'
import { type Context } from 'hono'
import { setCookie, deleteCookie, getCookie } from 'hono/cookie'
export const kindeClient = createKindeServerClient(
	GrantType.AUTHORIZATION_CODE,
	{
		authDomain: process.env.KINDE_DOMAIN!,
		clientId: process.env.KINDE_CLIENT_ID!,
		clientSecret: process.env.KINDE_CLIENT_SECRET,
		redirectURL: process.env.KINDE_REDIRECT_URI!,
		logoutRedirectURL: process.env.KINDE_LOGOUT_REDIRECT_URI,
	},
)

export const sessionManager = (c: Context): SessionManager => ({
	async getSessionItem(key: string) {
		const res = getCookie(c, key)
		return res
	},
	async setSessionItem(key: string, value: unknown) {
		const cookieOptions = {
			httpOnly: true,
			secure: false,
			sameSite: 'Lax',
		} as const
		if (typeof value == 'string') {
			setCookie(c, key, value, cookieOptions)
		} else {
			setCookie(c, key, JSON.stringify(value), cookieOptions)
		}
	},
	async removeSessionItem(key: string) {
		deleteCookie(c, key)
	},
	async destroySession() {
		;['id_token', 'access_token', 'user', 'refresh_token'].forEach(token =>
			deleteCookie(c, token),
		)
	},
})
