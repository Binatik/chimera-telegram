import { MemberDto } from '../dto/member.dto'
import { MemberEntity } from '../entity/member.entity'

export interface IMemberService {
	createMember: (memberDto: MemberDto) => Promise<MemberEntity | null>
}
