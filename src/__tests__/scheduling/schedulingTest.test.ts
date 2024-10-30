import { describe } from "@jest/globals";
import { SchedulingService } from "../../scheduling/service";
import { iSchedulingResponse } from "../../scheduling/interface/responses";
import { HttpError } from "../../utils/Errors/HttpError";
import { CreateScheduleDTO } from "../../scheduling/dto/schedulingDTO";
import { schedules } from "../../schedule/mocks/schecules";

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

jest.mock("../../utils/updateDoctorSchedule", () => ({
  updateDoctorSchedule: jest.fn(),
}));

describe("SchedulingService", () => {
  let schedulingService: SchedulingService;

  beforeEach(() => {
    schedulingService = new SchedulingService();
  });
  const service = new SchedulingService();

  it("should create a scheduling with", () => {
    const schedulingData: CreateScheduleDTO = {
      medico_id: schedules[0].id,
      data_horario: schedules[0].horarios_disponiveis[0],
      paciente_nome: "John Doe",
    };
    const res = service.createScheduling(schedulingData) as iSchedulingResponse;

    expect(res).toHaveProperty("mensagem");
    expect(res).toHaveProperty("agendamento");
    expect(res.mensagem).toBe("Agendamento realizado com sucesso");
    expect(res.agendamento.data_horario).toBe(
      schedules[0].horarios_disponiveis[0],
    );
    expect(res.agendamento.medico).toBe(schedules[0].nome);
    expect(res.agendamento.paciente).toBe(schedulingData.paciente_nome);
  });

  it("should throw a 404 error if doctor is not found", () => {
    const schedulingData: CreateScheduleDTO = {
      medico_id: 1000000,
      data_horario: "2024-10-30T10:00:00",
      paciente_nome: "John Doe",
    };

    expect(() => schedulingService.createScheduling(schedulingData)).toThrow(
      new HttpError(
        404,
        "O médico com o ID informado não foi encontrado na nossa base de dados",
      ),
    );
  });

  it("should throw a 406 error if scheduling time is not available", () => {
    const schedulingData: CreateScheduleDTO = {
      medico_id: 1,
      data_horario: "2024-10-30T10:00:00",
      paciente_nome: "John Doe",
    };

    jest.mock("../../schedule/mocks/schecules", () => ({
      schedules: [
        {
          id: "existing-id",
          nome: "Dr. Smith",
          horarios_disponiveis: ["2024-10-30T09:00:00"], // Different time
        },
      ],
    }));

    expect(() => schedulingService.createScheduling(schedulingData)).toThrow(
      new HttpError(406, "O horário do agendamento não está disponível"),
    );
  });
});
