import { ConfigEntity } from '../entity/config.entity'
import { IConfigService } from './config.service.interface'

export class ConfigService extends ConfigEntity implements IConfigService {
	constructor() {
		super()
	}
	get(key: string) {
		const parsed = this.parsed
		if (!parsed) {
			throw new Error('Нет такого ключа.')
		}
		return parsed[key]
	}
}
