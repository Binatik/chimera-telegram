import express, { Express } from 'express'
import { Bot } from 'grammy'
import { Server } from 'http'
import { MemberConroller } from '../member/controller/member.controller'
import { ConfigService } from '../config/service/config.service'
import { IContextBot } from './app.context.interface'
import { json } from 'body-parser'
import { ExeptionFilter } from '../errors/exeption.filter'

function getInstancesApp() {
	return {
		memberConroller: new MemberConroller(),
		configService: new ConfigService(),
		exeptionFilter: new ExeptionFilter(),
	}
}

type IInstances = ReturnType<typeof getInstancesApp>

class App {
	instances: IInstances
	app: Express
	server: Server
	port: '8000' | '3000'
	chimera: Bot<IContextBot>
	memberConroller: MemberConroller

	constructor(instances: IInstances) {
		this.instances = instances
		this.app = express()
		this.port = '3000'
	}

	useExeptionFilters() {
		this.app.use(this.instances.exeptionFilter.catch.bind(this.instances.exeptionFilter))
	}

	useMiddleware() {
		this.app.use(express.json())
	}

	useBot() {
		this.chimera = new Bot<IContextBot>(this.instances.configService.get('TOKEN'))
		this.chimera.start()
	}

	useRouter() {
		this.app.use('/member', this.instances.memberConroller.router)
	}

	public async run() {
		this.useBot()
		this.useMiddleware()
		this.useRouter()
		this.useExeptionFilters()
		this.app.listen(this.port, () =>
			console.log(`Сервер запущен на http://localhost:${this.port}/member`)
		)
	}
}

async function combine() {
	await new App(getInstancesApp()).run()
}
combine()
