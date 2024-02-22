export type LoginReqData = {
  userId: string;
  password: string;
};

export type RegisterReqData = {
  repectPassword: string;
} & LoginReqData;
