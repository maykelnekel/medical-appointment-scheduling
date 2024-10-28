import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { SchedulingService } from "../service";
import { CreateScheduleDTO } from "../dto/schedulingDTO";

const service = new SchedulingService();
export class SchedulingController {
  async createScheduling(
    event: APIGatewayProxyEvent,
  ): Promise<APIGatewayProxyResult> {
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
  }
}
