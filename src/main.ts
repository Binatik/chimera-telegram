// import { Bot } from 'grammy'
// import express from 'express'
// import dotenv from 'dotenv'

// dotenv.config()

// const port = 8000
// const app = express()

// app.listen(port, () => console.log('Сервер запущен на' + port))

// async function run() {
// 	const token = process.env.TOKEN
// 	if (!token) return

// 	const chimera = new Bot(token)

// 	// chimera.command('info', async (ctx) => {
// 	// 	await ctx.reply('I got your message!', { message_thread_id: ctx.msg.message_thread_id })
// 	// })
// 	chimera.on('message:new_chat_members', async (ctx) => {
// 		const members: Array<any> = []
// 		const newMember = {
// 			id: ctx.msg.from.id,
// 			name: ctx.msg.from.first_name,
// 			roles: [],
// 		}

// 		const isIdMember = members.some((member) => member.id !== newMember.id)
// 		console.log(isIdMember)
// 		if (isIdMember) return

// 		members.push(newMember)
// 		console.log(members)
// 	})

// 	chimera.start()
// }
// run()
