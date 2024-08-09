import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
// import { TanStackRouterDevTools } from '@tanstack/router-devtools'
export const Route = createRootRoute({
	component: () => <Root />,
})
function Root() {
	return (
		<>
			<Header />
			<Outlet />
			{/* <TanStackRouterDevTools /> */}
		</>
	)
}
function Header() {
	return (
		<>
			<header>
				<nav className="w-full h-20 flex justify-center gap-10 items-center">
					<Link to="/" className="[&.active]:font-bold">
						Home
					</Link>
					<Link to="/about" className="[&.active]:font-bold">
						about
					</Link>
					<Link to="/expenses" className="[&.active]:font-bold">
						Expenses
					</Link>
				</nav>
			</header>
		</>
	)
}
