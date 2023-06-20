import { Request, Response, NextFunction } from 'express'
import { RouteController } from '../../route/route.controller'
import { MemberService } from '../service/member.service'
import { MemberDto } from '../dto/member.dto'
import { HTTPError } from '../../errors/exeption.filter'

export function getInstancesController() {
	return {
		memberService: new MemberService(),
	}
}

export type IInstancesController = ReturnType<typeof getInstancesController>

export class MemberConroller extends RouteController {
	private instancesController: IInstancesController

	constructor() {
		super()
		this.instancesController = getInstancesController()
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
		console.log(this)
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
