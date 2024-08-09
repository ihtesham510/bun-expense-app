import { Hono } from 'hono'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'
const expenseSchema = z.object({
	id: z.number().positive(),
	title: z.string(),
	amount: z.number().positive(),
})

type Expense = z.infer<typeof expenseSchema>
const postExpenseBody = expenseSchema.omit({ id: true })

const expenses: Expense[] = [
	{ id: 1, title: 'Coffee', amount: 3.5 },
	{ id: 2, title: 'Groceries', amount: 45.0 },
	{ id: 3, title: 'Gas', amount: 30.0 },
	{ id: 4, title: 'Electricity Bill', amount: 60.0 },
	{ id: 5, title: 'Internet Bill', amount: 50.0 },
]

const expenseRoute = new Hono()
	.get('/', c => {
		return c.json(expenses)
	})

	.get('/total', c => {
		const total = expenses.reduce(
			(prev, next) => {
				return { amount: prev.amount + next.amount }
			},
			{ amount: 0 },
		).amount
		return c.json({ total: total })
	})

	.get('/:id{[0-9]+}', c => {
		const id = Number.parseInt(c.req.param('id'))
		const expense = expenses.find(ex => ex.id == id)
		if (!expense) return c.json('not found')
		return c.json(expense)
	})

	.patch('/:id{[0-9]+}', zValidator('json', postExpenseBody), c => {
		const id = Number.parseInt(c.req.param('id'))
		const { title, amount } = c.req.valid('json')
		const index = expenses.findIndex(ex => ex.id == id)
		expenses[index].title = title
		expenses[index].amount = amount
		return c.json(expenses[index])
	})

	.post('/', zValidator('json', postExpenseBody), c => {
		const { title, amount } = c.req.valid('json')
		const newExpense = {
			title: title,
			amount: amount,
			id: Math.floor(Math.random() * 1000 + 1),
		}
		expenses.push(newExpense)
		return c.json(newExpense)
	})

	.delete('/:id{[0-9]+}', c => {
		const id = Number.parseInt(c.req.param('id'))
		const index = expenses.findIndex(ex => ex.id == id)
		expenses.splice(index, 1)
		return c.json(expenses)
	})

export default expenseRoute
