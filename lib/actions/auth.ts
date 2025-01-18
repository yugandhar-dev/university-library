"use server"

import { signIn } from "@/auth"
import { db } from "@/db/drizzle"
import { users } from "@/db/schema"
import { hash } from "bcryptjs"
import { eq } from "drizzle-orm"

export const signUp = async (params: AuthCredentials) => {
  const { fullName, email, password, universityId, universityCard } = params

  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1)

  if (existingUser.length > 0) {
    return {
      success: false,
      error: "User with this email already exists",
    }
  }

  const hashedPassword = await hash(password, 10)

  try {
    await db.insert(users).values({
      fullName,
      email,
      password: hashedPassword,
      universityId,
      universityCard,
    })

    await signInWithCredentials({ email, password })

    return {
      success: true,
    }
  } catch (error) {
    console.error(error, "sign up error")
    return {
      success: false,
      error: "Sign Up error",
    }
  }
}

export const signInWithCredentials = async (
  params: Pick<AuthCredentials, "email" | "password">
) => {
  const { email, password } = params

  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    if (result?.error) {
      return {
        success: false,
        error: result.error,
      }
    }

    return {
      success: true,
    }
  } catch (error) {
    console.error(error, "sign in error")
    return {
      success: false,
      error: "Sign In error",
    }
  }
}