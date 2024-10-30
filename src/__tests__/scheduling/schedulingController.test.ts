import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { SchedulingController } from "../../scheduling/controller";
import { iSchedulingResponse } from "../../scheduling/interface/responses";
import { schedules } from "../../schedule/mocks/schecules";

// Mock SchedulingService

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

describe("SchedulingController", () => {
  let controller: SchedulingController;

  beforeEach(() => {
    controller = new SchedulingController();
  });

  it("should return a 200 status code with the scheduling response", async () => {
    const mockSchedulingResponse: iSchedulingResponse = {
      mensagem: "Agendamento realizado com sucesso",
      agendamento: {
        data_horario: schedules[0].horarios_disponiveis[0],
        medico: schedules[0].nome,
        paciente: "John Doe",
      },
    };

    const event = {
      body: JSON.stringify({
        medico_id: schedules[0].id,
        data_horario: schedules[0].horarios_disponiveis[0],
        paciente_nome: "John Doe",
      }),
    } as APIGatewayProxyEvent;

    const result: APIGatewayProxyResult =
      await controller.createScheduling(event);

    expect(result.statusCode).toBe(200);
    expect(result.body).toBe(JSON.stringify(mockSchedulingResponse));
  });
});
