import { SvEvent, SvStatus } from "../types";

export const decodeSvStatus = (status: SvStatus): SvEvent => {
  return {
    logging: !!status[0],
    runing: !!status[1],
    alarm: !!status[2],
    warning: !!status[3],
  }
};