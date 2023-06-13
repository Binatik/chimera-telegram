import express, { Express } from 'express'
import { Bot } from 'grammy'
import { Server } from 'http'
import { MemberConroller } from '../member/controller/member.controller'
import { ConfigService } from '../config/service/config.service'
import { IContextBot } from './app.context.interface'

function getInstancesApp() {
	return {
		memberConroller: new MemberConroller(),
		configService: new ConfigService(),
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
		this.memberConroller = instances.memberConroller
	}

	useBot() {
		this.chimera = new Bot<IContextBot>(this.instances.configService.get('TOKEN'))
		this.chimera.start()
	}

	useRouter() {
		this.app.use('/member', this.memberConroller.router)
	}

	public async run() {
		this.useBot()
		this.useRouter()
		this.app.listen(this.port, () =>
			console.log(`Сервер запущен на http://localhost:${this.port}/member`)
		)
	}
}

async function combine() {
	await new App(getInstancesApp()).run()
}
combine()
