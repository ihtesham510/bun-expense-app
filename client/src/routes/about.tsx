import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
	component: () => <Index />,
})
function Index() {
	return <div>hellow about</div>
}

