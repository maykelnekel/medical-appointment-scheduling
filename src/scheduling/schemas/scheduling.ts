import Joi from "joi";

export const createSchedulingSchema = Joi.object({
  paciente_nome: Joi.string(),
  data_horario: Joi.string(),
  medico_id: Joi.number().integer(),
});
