import { schedules } from "../../schedule/mocks/schecules";
import { CreateScheduleDTO, ScheduleDTO } from "../dto/schedulingDTO";
import { iSchedulingResponse } from "../interface/responses";
import { schedulings } from "../mocks/scheculings";
import { HttpError } from "../../utils/Errors/HttpError";
import { updateDoctorSchedule } from "../../utils/updateDoctorSchedule";

export class SchedulingService {
  createScheduling(
    schedulingData: CreateScheduleDTO,
  ): iSchedulingResponse | HttpError {
    const doctorIndex = schedules.findIndex(
      (doctor) => doctor.id === schedulingData.medico_id,
    );

    if (doctorIndex === -1) {
      throw new HttpError(
        404,
        "O médico com o ID informado não foi encontrado na nossa base de dados",
      );
    }

    const doctor = schedules[doctorIndex];

    if (!doctor.horarios_disponiveis.includes(schedulingData.data_horario)) {
      throw new HttpError(406, "O horário do agendamento não está disponível");
    }

    updateDoctorSchedule(doctorIndex, schedulingData.data_horario);
    schedulings.push(schedulingData);

    const schedulingResponse = new ScheduleDTO(
      doctor.nome,
      schedulingData.data_horario,
      schedulingData.paciente_nome,
    );

    return {
      mensagem: "Agendamento realizado com sucesso",
      agendamento: schedulingResponse,
    };
  }
}
