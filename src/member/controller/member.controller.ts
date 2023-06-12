import { Request, Response, NextFunction } from 'express'
import { RouteController } from '../../route/route.controller'

export class MemberConroller extends RouteController {
	constructor() {
		super()
		this.bindRoutes([
			{
				path: '/',
				method: 'get',
				func: this.test,
				test: console.log('сработал bindRoutes /'),
			},
			{
				path: '/create',
				method: 'post',
				func: this.create,
				test: console.log('сработал bindRoutes /create'),
			},
			{
				path: '/update',
				method: 'put',
				func: this.update,
				test: console.log('сработал bindRoutes /update'),
			},
			{
				path: '/delete',
				method: 'delete',
				func: this.delete,
				test: console.log('сработал bindRoutes /delete'),
			},
		])
	}

	create(req: Request, res: Response, next: NextFunction) {
		res.send('create')
		console.log('create')
	}

	update(req: Request, res: Response, next: NextFunction) {
		res.send('update')
		console.log('update')
	}

	delete(req: Request, res: Response, next: NextFunction) {
		res.send('delete')
		console.log('delete')
	}

	test(req: Request, res: Response, next: NextFunction) {
		res.send('test')
		console.log('test')
	}
}
