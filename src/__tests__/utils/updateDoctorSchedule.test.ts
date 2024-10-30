import { schedules } from "../../schedule/mocks/schecules";
import { updateDoctorSchedule } from "../../utils/updateDoctorSchedule";

// Mock schedules
jest.mock("../../schedule/mocks/schecules", () => ({
  schedules: [
    {
      id: 1,
      nome: "Dr. João Silva",
      especialidade: "Cardiologista",
      horarios_disponiveis: [
        "2024-10-05 09:00",
        "2024-10-05 10:00",
        "2024-10-05 11:00",
      ],
    },
    {
      id: 2,
      nome: "Dra. Maria Souza",
      especialidade: "Dermatologista",
      horarios_disponiveis: ["2024-10-06 14:00", "2024-10-06 15:00"],
    },
  ],
}));

describe("updateDoctorSchedule", () => {
  it("should remove the specified time from the doctor's schedule", () => {
    const doctorIndex = 0;
    const scheduleTime = schedules[doctorIndex].horarios_disponiveis[0];
    const filteredTimes = schedules[doctorIndex].horarios_disponiveis.filter(
      (time) => time !== scheduleTime,
    );

    updateDoctorSchedule(doctorIndex, scheduleTime);

    expect(schedules[doctorIndex].horarios_disponiveis).toEqual(filteredTimes);
  });

  it("should not change the schedule if the time does not exist", () => {
    const doctorIndex = 0;
    const scheduleTime = "15:00"; // Non-existent time
    const scheculesTimeList = schedules[doctorIndex].horarios_disponiveis;

    updateDoctorSchedule(doctorIndex, scheduleTime);

    expect(schedules[doctorIndex].horarios_disponiveis).toEqual(
      scheculesTimeList,
    );
  });
});
