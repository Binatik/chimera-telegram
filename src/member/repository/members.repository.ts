import { MemberDto } from './../dto/member.dto'
import { getInstancesRepository } from '../../app/Instances'

export class MemberRepository {
	constructor() {}

	async create({ id, name, roles }: MemberDto) {
		//Последний слой абстракции не требует передачи в конструктор.
		const instancesRepository = getInstancesRepository()
		const insertMemberQuery = 'INSERT INTO member (id, name) VALUES ($1, $2) RETURNING id'
		const insertMemberValues = [id, name]
		const memberResult = await instancesRepository.databaseService.pool.query(
			insertMemberQuery,
			insertMemberValues
		)
		const memberId = memberResult.rows[0].id
		const insertRoleQuery = 'INSERT INTO role (member_id, role) VALUES ($1, $2)'
		for (const role of roles) {
			const insertRoleValues = [memberId, role]
			await instancesRepository.databaseService.pool.query(insertRoleQuery, insertRoleValues)
		}
	}
}
