import dotenv, { DotenvConfigOutput } from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(__dirname, '../.env') })
export class ConfigEntity {
	private _config: DotenvConfigOutput | undefined

	constructor() {
		this._config = dotenv.config()
	}

	get error() {
		console.log(this._config)
		if (!this._config) {
			throw new Error('Не удалось найти config')
		}
		return this._config.error
	}

	get parsed() {
		if (!this._config) {
			throw new Error('Не удалось найти config')
		}
		return this._config.parsed
	}
}
