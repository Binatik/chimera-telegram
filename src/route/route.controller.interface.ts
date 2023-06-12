import { Request, Response, NextFunction, Router } from 'express'

export interface IRouteController {
	method: keyof Pick<Router, 'get' | 'post' | 'put' | 'patch' | 'delete'>
	path: string
	test: any
	func: (req: Request, res: Response, next: NextFunction) => void
}
