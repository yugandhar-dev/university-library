"use client"

import AuthForm from "@/components/AuthForm"
import { signInSchema } from "@/lib/validations"

const page = () => {
  return (
    <AuthForm
      type="SIGN_IN"
      schema={signInSchema}
      defaultValues={{
        email: "",
        password: "",
      }}
      onSubmit={async data => {
        return { success: true }
      }}
    />
  )
}
export default page
