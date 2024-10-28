import { iScheduleResponse } from "../interface/responses";
import { schedules } from "../mocks/schecules";

export class ScheduleService {
  getSchedules(): iScheduleResponse {
    return { medicos: schedules };
  }
}
