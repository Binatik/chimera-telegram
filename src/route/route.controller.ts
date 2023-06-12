import { Router } from 'express'
import { IRouteController } from './route.controller.interface'

export class RouteController {
	private readonly _router: Router

	constructor() {
		this._router = Router()
	}

	get router() {
		return this._router
	}

	protected bindRoutes(routes: IRouteController[]) {
		for (const route of routes) {
			const hendler = route.func.bind(this)
			this.router[route.method](route.path, hendler)

			// console.log(`Забиндили метод ${route.method} по пути ${route.path} функция ${hendler}`)
		}
	}
}
