import { z } from "zod";

export const CadastroSchemaTemplate = z
  .object({
    nome: z
      .string()
      .min(3, { message: "O nome deve ter no mínimo 3 caracteres." }),
    email: z.string().email({ message: "Email inválido." }),
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
    confirmaSenha: z.string(),
    numeroCelular: z.string().optional(),
  })
  .refine((data) => data.senha === data.confirmaSenha, {
    message: "As senhas devem ser iguais.",
    path: ["confirmaSenha"],
  });

export type CadastroSchema = z.infer<typeof CadastroSchemaTemplate>;
