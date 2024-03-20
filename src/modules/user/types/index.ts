export type LoginReqData = {
  userId: string;
  password: string;
};

export type RegisterReqData = {
  repeatPassword: string;
} & LoginReqData;
