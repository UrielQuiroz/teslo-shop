'use server'

import { signIn } from "@/auth.config"

export async function authenticate(
    prevState: string | undefined,
    formData: FormData
) {
    try {
        
        console.log({ formData: Object.fromEntries(formData) });

        await signIn('credentials', Object.fromEntries(formData));

    } catch (error) {
        return 'CredentialsSignin'
    }
}