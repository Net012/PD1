import { z } from "zod";

export const LoginSchemaTemplate = z.object({
  email: z.string().email({
    message: "Email Invalido.",
  }),
  senha: z
    .string()
    .min(8, { message: "A senha deve ter no mínimo 8 caracteres." })
    .max(40, { message: "A senha deve ter no máximo 40 caracteres." })
    .regex(/[A-Z]/, {
      message: "A senha deve conter pelo menos uma letra maiúscula.",
    })
    .regex(/[a-z]/, {
      message: "A senha deve conter pelo menos uma letra minúscula.",
    })
    .regex(/[0-9]/, { message: "A senha deve conter pelo menos um número." })
    .regex(/[@$!%*?&]/, {
      message:
        "A senha deve conter pelo menos um caractere especial (@, $, !, %, *, ?, &).",
    }),
});

export type LoginSchema = z.infer<typeof LoginSchemaTemplate>;
