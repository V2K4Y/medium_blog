import z from "zod";

export const singupInput = z.object({
    email: z.string().email(),
    name: z.string().min(1),
    password: z.string().min(6),
})

export const singinInput = z.object({
    email: z.string().email(),
    password: z.string().min(6),
})

export const blogCreateInput = z.object({
    title: z.string(),
    content: z.string(),
})

export const blogUpdateInput = z.object({
    id: z.string(),
    title: z.string(),
    content: z.string(),
})

export type SingupInput = z.infer<typeof singupInput>;
export type SinginInput = z.infer<typeof singinInput>;
export type BlogCreateInput = z.infer<typeof blogCreateInput>;
export type BlogUpdateInput = z.infer<typeof blogUpdateInput>;