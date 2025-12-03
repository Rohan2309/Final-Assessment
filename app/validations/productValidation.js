import Joi from "joi"
export const productSchema = Joi.object({
  name: Joi.string().min(2).required(),
  category: Joi.string().required(),
  description: Joi.string().allow("")
})
