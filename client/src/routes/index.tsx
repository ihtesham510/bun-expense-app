import { createFileRoute } from '@tanstack/react-router'
import api from '@/lib/api'
import { useQuery } from '@tanstack/react-query'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'

export const Route = createFileRoute('/')({
	component: () => <Index />,
})

async function getTotalAmount() {
	const res = await api.expenses['total'].$get()
	if (!res.ok) throw new Error('Server Error')
	const data = await res.json()
	return data
}

function Index() {
	const { data, isLoading } = useQuery({
		queryKey: ['total'],
		queryFn: getTotalAmount,
	})
	return (
		<div className="w-full flex justify-center items-center">
			<Card className="w-[300px]">
				<CardHeader>
					<CardTitle>Total</CardTitle>
					<CardDescription>Total amount you have spent</CardDescription>
				</CardHeader>
				<CardContent>
					{data && !isLoading && <h1 className="text-3xl">{data?.total}</h1>}
				</CardContent>
			</Card>
		</div>
	)
}
