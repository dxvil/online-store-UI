import * as yup from "yup";

export const registrationSchema = yup.object({
	name: yup.string().required(),
	email: yup.string().email().required(),
	password: yup.string().required(),
	avatar: yup.string().url().required()
}).required();