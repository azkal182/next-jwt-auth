import * as z from "zod"

const LoginSchema = z.object({
    username: z.string().min(3),
    password: z.string().min(4)
})
export {
    LoginSchema
}
