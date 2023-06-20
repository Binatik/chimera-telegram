import { MemberEntity } from '../entity/member.entity'
import { MemberDto } from './../dto/member.dto'
import { IMemberService } from './member.service.interface'

export class MemberService implements IMemberService {
	async createMember({ id, name, roles }: MemberDto): Promise<MemberEntity | null> {
		const member = new MemberEntity(id, name, roles)
		return null
	}
}
