import { instance } from "../../common/api/common.api";

export const authApi = {
  register: (arg: ArgRegisterType) => {
    const arg2 = 'blabla' //если вдруг
    return instance.post<RegisterResponseType>("auth/register", arg); //только возвращаймый тип. Но если типизировать arg, то надо присать большую типизацию Axios...
  },
  login: (arg: ArgLoginType) => {
    return instance.post<ProfileType>('auth/login', arg)
  }
};

export type ArgLoginType = {
  email: string
  password: string
  rememberMe: boolean
}
export type ArgRegisterType = Omit<ArgLoginType, 'rememberMe'>
// export type ArgRegisterType = {
//   email: string,
//   password: string
// }

export type RegisterResponseType = {
  addedUser: Omit<ProfileType, 'token' | 'tokenDeathTime'>
}

export type ProfileType = {
	_id: string;
	email: string;
	rememberMe: boolean;
	isAdmin: boolean;
	name: string;
	verified: boolean;
	publicCardPacksCount: number;
	created: string;
	updated: string;
	__v: number;

	token: string;
	tokenDeathTime: number;
}
////////////////////////////////////
//typescriptlang.org/play~

//
// export type ArgLoginType = {
//   email: string
//   password: string
//   rememberMe: boolean
// }
// type OmitType = Omit<ArgLoginType, 'rememberMe'>
// type PickType = Pick<ArgLoginType, 'email' | 'password'>
// type PartialType = Partial<ArgLoginType>

//////////////////////////////////////