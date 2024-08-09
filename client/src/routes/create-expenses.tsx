import { Input } from '@/components/ui/input'
import { createFileRoute } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export const Route = createFileRoute('/create-expenses')({
	component: () => <CreateExpenses />,
})

function CreateExpenses() {
	return (
		<div>
			<form>this is a form</form>
		</div>
	)
}
