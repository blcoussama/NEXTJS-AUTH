"use server"

import * as z from "zod"
import { prisma } from "@/prisma/prisma"
import bcrypt from "bcryptjs"
import { RegisterSchema } from "@/schemas"

export const register = async(data: z.infer<typeof RegisterSchema>) => {
    try {
        const validatedData = RegisterSchema.parse(data)
        if(!validatedData) {
            return { error: "Invalid Input data!" }
        }

        const { email, name, password, passwordConfirm } = validatedData;

        if(password !== passwordConfirm) {
            return { error: "Passwords do not match!"}
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const userExists = await prisma.user.findFirst({
            where: {
                email
            }
        })

        if(userExists) return { error: "User Already Exists!"}

        const lowerCaseEmail = email.toLowerCase();

        const user = await prisma.user.create({
            data: {
                email: lowerCaseEmail,
                password: hashedPassword,
                name 
            }
        })

        return { success: "User Created Successfully."}
        
    } catch (error) {
        console.error(error)
        return {error: "An error Occured while registering!"}
    }
}
