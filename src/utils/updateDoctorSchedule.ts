import { iDoctor } from "../schedule/interface/doctor";
import { schedules } from "../schedule/mocks/schecules";

export function updateDoctorSchedule(
  doctorIndex: number,
  scheduleTime: string,
): void {
  const currentSchedule = schedules[doctorIndex].horarios_disponiveis;
  const newDoctorTimes = currentSchedule.filter(
    (time) => time !== scheduleTime,
  );
  console.log(newDoctorTimes);
  const newDoctorData: iDoctor = {
    ...schedules[doctorIndex],
    horarios_disponiveis: newDoctorTimes,
  };

  schedules[doctorIndex] = newDoctorData;
}
