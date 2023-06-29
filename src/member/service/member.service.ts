import { IInstancesService, getInstancesService } from '../../app/Instances'
import { MemberEntity } from '../entity/member.entity'
import { MemberDto } from './../dto/member.dto'
import { IMemberService } from './member.service.interface'

export class MemberService implements IMemberService {
	constructor(private instancesService: IInstancesService) {
		this.instancesService = instancesService
	}

	async createMember({ id, name, roles }: MemberDto): Promise<MemberEntity | null> {
		const member = new MemberEntity(id, name, roles)
		this.instancesService.memberRepository.create(member)
		return member
	}
}
