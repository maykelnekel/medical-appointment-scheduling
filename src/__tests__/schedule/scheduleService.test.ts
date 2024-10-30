import { describe, expect } from "@jest/globals";
import { ScheduleService } from "../../schedule/service";
import { schedules } from "../../schedule/mocks/schecules";

describe("ScheduleService", () => {
  const service = new ScheduleService();

  it("should return a list of doctors", () => {
    const res = service.getSchedules();

    expect(res.medicos).toEqual(schedules);
  });

  it("should match with the doctor in the first position of mock schedule ", () => {
    const res = service.getSchedules();

    expect(res.medicos[0]).toEqual(schedules[0]);
  });
});
