import Joi from "joi";

export const createSchedulingSchema = Joi.object({
  paciente_nome: Joi.string().required().messages({
    "any.required": "O campo paciente_nome é obrigatório",
    "string.base": "O valor precisa ser uma string",
  }),
  data_horario: Joi.string()
    .regex(/^(\d{4})-(\d{2})-(\d{2}) (\d{2}:\d{2})$/)
    .required()
    .messages({
      "any.required": "O campo data_horario é obrigatório",
      "string.base": "O valor precisa ser uma string",
      "string.pattern.base":
        "O formato precisa ser compatível com: AAAA-MM-DD HH:MM.",
    }),
  medico_id: Joi.number()
    .integer()
    .messages({
      "any.required": "O campo data_horario é obrigatório",
      "number.base": "O valor precisa ser um número inteiro",
    })
    .required(),
});
