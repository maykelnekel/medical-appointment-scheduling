import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { SchedulesController } from "../../schedule/controller";
import { iScheduleResponse } from "../../schedule/interface/responses";
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

describe("SchedulesController", () => {
  let controller: SchedulesController;

  beforeEach(() => {
    controller = new SchedulesController();
  });

  it("should return a 200 status code with the list of schedules", async () => {
    const mockSchedules: iScheduleResponse = {
      medicos: schedules,
    };

    const event = {} as APIGatewayProxyEvent;
    const result: APIGatewayProxyResult = await controller.getSchedules(event);

    expect(result.statusCode).toBe(200);
    expect(result.body).toBe(JSON.stringify(mockSchedules));
  });
});
