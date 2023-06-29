import { Pool } from 'pg'
import { IInstancesService, getInstancesService } from '../app/Instances'
import { IDatabaseService } from './database.service.interface'

export class DatabaseService implements IDatabaseService {
	pool: Pool
	private instancesService: IInstancesService

	constructor() {
		this.instancesService = getInstancesService()
		this.pool = new Pool({
			user: 'atom',
			host: 'localhost',
			database: 'telegram',
			password: this.instancesService.configService.get('DBPASSWORD'),
			port: 5432,
		})
	}

	async connect(): Promise<void> {
		await this.pool.connect()
		console.log('Подключились к БД.')
	}

	async disconnect(): Promise<void> {
		await this.pool.end()
	}
}
