import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { ScheduleService } from "../service";

const service = new ScheduleService();

export class SchedulesController {
  async getSchedules(_: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    const schecules = service.getSchedules();

    return {
      statusCode: 200,
      body: JSON.stringify(schecules),
    };
  }
}
