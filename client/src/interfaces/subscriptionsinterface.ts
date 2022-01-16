import { IChanel } from "./chanelinterface";

export interface ISubscriptions {
  _id: string;
  chanel: IChanel[];
  createdAt: string;
  updatedAt: string;
}
