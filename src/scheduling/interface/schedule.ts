export interface iSchedulingCreation {
  medico_id: number;
  paciente_nome: string;
  data_horario: string;
}

export interface iScheduling {
  medico: string;
  paciente: string;
  data_horario: string;
}
