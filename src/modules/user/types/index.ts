export type LoginReqData = {
  userId: string;
  password: string;
};

export type RegisterReqData = {
  repeatPassword: string;
} & LoginReqData;

export type UpdateUserInfoReqData = {
  userId: string;
  password?: string;
  repeatPassword?: string;
  avatarPath?: string;
  nickName?: string;
};
