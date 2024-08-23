const Joi = require("joi");

exports.addSchoolSV = Joi.object({
  name: Joi.string().required(),
  address: Joi.string().required(),
  latitude: Joi.number().required(),
  longitude: Joi.number().required(),
});

exports.listSchoolsSV = Joi.object({
  latitude: Joi.string()
    .pattern(/^-?\d+(\.\d+)?$/)
    .required(),
  longitude: Joi.string()
    .pattern(/^-?\d+(\.\d+)?$/)
    .required(),
});
