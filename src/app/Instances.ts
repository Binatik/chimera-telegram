import { DatabaseService } from './../database/database.service'
import { ConfigService } from './../config/service/config.service'
import { MemberRepository } from './../member/repository/members.repository'
// import { DatabaseService } from '../database/database.service'
import { ExeptionFilter } from '../errors/exeption.filter'
import { MemberConroller } from '../member/controller/member.controller'
import { MemberService } from '../member/service/member.service'

export type IInstances = ReturnType<typeof getInstancesApp>

export function getInstancesController() {
	return {
		memberService: new MemberService(getInstancesService()),
	}
}
export type IInstancesController = ReturnType<typeof getInstancesController>

export function getInstancesService() {
	return {
		memberRepository: new MemberRepository(),
		configService: new ConfigService(),
	}
}
export type IInstancesService = ReturnType<typeof getInstancesService>

export function getInstancesRepository() {
	return {
		databaseService: new DatabaseService(),
	}
}
export type IInstancesRepository = ReturnType<typeof getInstancesRepository>

export function getInstancesApp() {
	return {
		memberConroller: new MemberConroller(getInstancesController()),
		configService: new ConfigService(),
		exeptionFilter: new ExeptionFilter(),
		databaseService: new DatabaseService(),
	}
}

//Старайтесь вызывать getInstances не в конструкторе.
