import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { SchedulingService } from "../service";
import { CreateScheduleDTO } from "../dto/schedulingDTO";
import { HttpError } from "../../utils/Errors/HttpError";

const service = new SchedulingService();
export class SchedulingController {
  async createScheduling(
    event: APIGatewayProxyEvent,
  ): Promise<APIGatewayProxyResult> {
    try {
      const body = JSON.parse(event.body!);
      const scheduling = new CreateScheduleDTO(
        body.medico_id,
        body.data_horario,
        body.paciente_nome,
      );
      const scheculingRes = service.createScheduling(scheduling);

      return {
        statusCode: 200,
        body: JSON.stringify(scheculingRes),
      };
    } catch (error) {
      if (error instanceof HttpError) {
        return {
          statusCode: error.statusCode,
          body: JSON.stringify({ message: error.message }),
        };
      } else {
        console.error(error);
        return {
          statusCode: 500,
          body: JSON.stringify({
            message: "Erro inesperado ao realizar agendamento",
          }),
        };
      }
    }
  }
}
