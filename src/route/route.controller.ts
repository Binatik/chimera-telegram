import { Response, Router } from 'express'
import { IRouteController } from './route.controller.interface'

export class RouteController {
	private readonly _router: Router

	constructor() {
		this._router = Router()
	}

	get router() {
		return this._router
	}

	public ok(res: Response, message: unknown) {
		res.type('application/json')
		return res.json(message)
	}

	protected bindRoutes(routes: IRouteController[]) {
		for (const route of routes) {
			const middlewares = route.middlewares?.map((middleware) =>
				middleware.execute.bind(middleware)
			)
			const hendler = route.func.bind(this)
			const middleware = middlewares ? [...middlewares, hendler] : hendler
			this.router[route.method](route.path, hendler)

			// console.log(`Забиндили метод ${route.method} по пути ${route.path} функция ${hendler}`)
		}
	}
}
