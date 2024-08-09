import { Skeleton } from '@/components/ui/skeleton'
import {
	TableCaption,
	TableHeader,
	TableRow,
	TableHead,
	TableBody,
	TableCell,
	Table,
} from '@/components/ui/table'
import api from '@/lib/api'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/expenses')({
	component: () => <Expenses />,
})

async function getExpenses() {
	const res = await api.expenses.$get()
	await new Promise(res => setTimeout(res, 400))
	const data = await res.json()
	return data
}
function Expenses() {
	const { data, isLoading } = useQuery({
		queryFn: getExpenses,
		queryKey: ['expenses'],
	})
	return (
		<div className="flex w-full my-10 justify-center items-center">
			<div className="w-max">
				<Table className="min-w-[500px]">
					<TableCaption>A list of your recent Expenses.</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[100px]">Id</TableHead>
							<TableHead>Title</TableHead>
							<TableHead>Amount</TableHead>
						</TableRow>
					</TableHeader>

					<TableBody>
						{isLoading &&
							Array.from({ length: 5 }, (_, i) => i + 1).map(i => (
								<TableRow key={i}>
									<TableCell>
										<Skeleton className="w-[100] h-[30px]" />
									</TableCell>
									<TableCell>
										<Skeleton className="w-[100] h-[30px]" />
									</TableCell>
									<TableCell>
										<Skeleton className="w-[100] h-[30px]" />
									</TableCell>
								</TableRow>
							))}
						{data &&
							!isLoading &&
							data?.map(ex => (
								<TableRow key={ex.id}>
									<TableCell className="font-medium">{ex.id}</TableCell>
									<TableCell>{ex.title}</TableCell>
									<TableCell>{ex.amount}</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
			</div>
		</div>
	)
}

