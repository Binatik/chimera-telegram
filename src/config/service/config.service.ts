import { ConfigEntity } from '../entity/config.entity'
import { IConfigService } from './config.service.interface'

export class ConfigService extends ConfigEntity implements IConfigService {
	get(key: string) {
		const config = new ConfigEntity()

		const parsed = config.parsed
		if (!parsed) throw new Error('Config is not parsed.')
		if (!parsed.hasOwnProperty(key)) throw new Error(`Key not found in config.`)

		return parsed[key]
	}
}
