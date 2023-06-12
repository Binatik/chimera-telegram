export class MemberEntity {
	constructor(private _id: string, private _name: string, private _roles: Array<string>) {}

	get id() {
		return this._id
	}

	get name() {
		return this._name
	}

	get roles() {
		return this._roles
	}
}
