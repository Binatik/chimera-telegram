import { Request, Response, NextFunction, Router } from 'express'

export interface IMiddleware {
	execute: (req: Request, res: Response, next: NextFunction) => void
}

export interface IRouteController {
	method: keyof Pick<Router, 'get' | 'post' | 'put' | 'patch' | 'delete'>
	path: string
	test: any
	middlewares?: IMiddleware[]
	func: (req: Request, res: Response, next: NextFunction) => void
}
