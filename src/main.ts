import { Bot } from 'grammy'
import dotenv from 'dotenv'

dotenv.config()

async function run() {
	const token = process.env.TOKEN
	if (!token) return

	const chimera = new Bot(token)

	chimera.command('info', async (ctx) => {
		const id = ctx.msg.message_thread_id
		await ctx.api.sendMessage(ctx.chat.id, 'Версия telegram-bot 0.1', { message_thread_id: id })
	})

	chimera.start()
}
run()
