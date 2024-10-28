import { schedules } from "../../schedule/mocks/schecules";
import { CreateScheduleDTO, ScheduleDTO } from "../dto/schedulingDTO";
import { iSchedulingResponse } from "../interface/responses";
import { schedulings } from "../mocks/scheculings";
import { HttpError } from "../../utils/Errors/HttpError";

export class SchedulingService {
  createScheduling(
    schedulingData: CreateScheduleDTO,
  ): iSchedulingResponse | HttpError {
    const findDoctor = schedules.find(
      (item) => item.id === schedulingData.medico_id,
    );

    if (!findDoctor) {
      throw new HttpError(
        404,
        "O médico com o ID informado não foi encontrado na nossa base de dados",
      );
    }

    if (
      !findDoctor.horarios_disponiveis.includes(schedulingData.data_horario)
    ) {
      throw new HttpError(
        406,
        "O horário do agendamento não está disponível, consulte novamente a disponibilidade do médico",
      );
    }

    schedulings.push(schedulingData);

    const schedulingResponse = new ScheduleDTO(
      findDoctor.nome,
      schedulingData.data_horario,
      schedulingData.paciente_nome,
    );

    return {
      mensagem: "Agendamento realizado com sucesso",
      agendamento: schedulingResponse,
    };
  }
}
