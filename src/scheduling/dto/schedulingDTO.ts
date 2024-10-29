import { iSchedulingCreation, iScheduling } from "../interface/schedule";

export class CreateScheduleDTO implements iSchedulingCreation {
  medico_id: number;
  data_horario: string;
  paciente_nome: string;
  constructor(medico_id: number, data_horario: string, paciente_nome: string) {
    this.medico_id = medico_id;
    this.data_horario = data_horario;
    this.paciente_nome = paciente_nome;
  }
}

export class ScheduleDTO implements iScheduling {
  data_horario: string;
  medico: string;
  paciente: string;
  constructor(doctor: string, dateTime: string, pacient: string) {
    this.medico = doctor;
    this.data_horario = dateTime;
    this.paciente = pacient;
  }
}
