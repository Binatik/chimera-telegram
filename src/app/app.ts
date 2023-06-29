import express, { Express } from 'express'
import { Bot } from 'grammy'
import { Server } from 'http'
import { MemberConroller } from '../member/controller/member.controller'
import { IContextBot } from './app.context.interface'
import { IInstances, getInstancesApp } from './Instances'

class App {
	app: Express
	server: Server
	port: '8000' | '3000'
	chimera: Bot<IContextBot>
	memberConroller: MemberConroller

	constructor(private instancesApp: IInstances) {
		this.instancesApp = instancesApp
		this.app = express()
		this.port = '3000'
	}

	useExeptionFilters() {
		this.app.use(this.instancesApp.exeptionFilter.catch.bind(this.instancesApp.exeptionFilter))
	}

	useMiddleware() {
		this.app.use(express.json())
	}

	useBot() {
		this.chimera = new Bot<IContextBot>(this.instancesApp.configService.get('TOKEN'))
		this.chimera.start()
	}

	useRouter() {
		this.app.use('/member', this.instancesApp.memberConroller.router)
	}

	public async run() {
		this.useBot()
		this.useMiddleware()
		this.useRouter()
		this.useExeptionFilters()
		await this.instancesApp.databaseService.connect()
		this.app.listen(this.port, () =>
			console.log(`Сервер запущен на http://localhost:${this.port}/member`)
		)
	}
}

async function combine() {
	await new App(getInstancesApp()).run()
}
combine()
