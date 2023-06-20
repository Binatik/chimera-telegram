import { Request, Response, NextFunction } from 'express'
import { IExeptionFilter } from './exeption.filter.interface'

export class HTTPError extends Error {
	code: number
	constructor(code: number, message: string) {
		super(message)
		this.code = code
		this.message = message
	}
}

export class ExeptionFilter implements IExeptionFilter {
	catch(error: Error | HTTPError, req: Request, res: Response, next: NextFunction) {
		if (error instanceof HTTPError) {
			res.send({
				httpStatusCode: error.code,
				message: error.message,
			})
			return
		}
		res.status(500).send(error.message)
	}
}
