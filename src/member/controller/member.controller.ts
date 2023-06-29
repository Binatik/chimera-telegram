import { Request, Response, NextFunction } from 'express'
import { RouteController } from '../../route/route.controller'
import { MemberDto } from '../dto/member.dto'
import { HTTPError } from '../../errors/exeption.filter'
import { IInstancesController } from '../../app/Instances'

export class MemberConroller extends RouteController {
	constructor(private instancesController: IInstancesController) {
		super()
		this.instancesController = instancesController
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

	async create(req: Request<{}, {}, MemberDto>, res: Response, next: NextFunction) {
		const member = await this.instancesController.memberService.createMember(req.body)

		if (!member) {
			return next(new HTTPError(404, 'Пользователь не найден'))
		}
		this.ok(res, member)
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
