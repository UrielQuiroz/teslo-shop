'use client'

import clsx from "clsx";
import Link from "next/link"
import { SubmitHandler, useForm } from "react-hook-form";

type FormInputs = {
  name: string;
  email: string;
  password: string;
}

export const RegisterForm = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>()

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        const { name, email, password } = data;

        console.log({ name, email, password })

        // Server action
    }

    return (
        <form onSubmit={ handleSubmit(onSubmit) } className="flex flex-col">

            {/* {
                errors.name?.type === 'required' && (
                    <span className="text-red-500">* El nombre es obligatorio</span>
                )
            } */}

            <label htmlFor="fullName">Nombre Completo</label>
            <input
                className={
                    clsx(
                        "px-5 py-2 border bg-gray-200 rounded mb-5",
                        {
                            'border-red-500': errors.name
                        }
                    )
                }
                type="text"
                autoFocus
                { ...register('name', { required: true }) } />

            <label htmlFor="email">Correo electrónico</label>
            <input
                className={
                    clsx(
                        "px-5 py-2 border bg-gray-200 rounded mb-5",
                        {
                            'border-red-500': errors.email
                        }
                    )
                }
                type="email"
                { ...register('email', { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ }) } />


            <label htmlFor="password">Contraseña</label>
            <input
                className={
                    clsx(
                        "px-5 py-2 border bg-gray-200 rounded mb-5",
                        {
                            'border-red-500': errors.password
                        }
                    )
                }
                type="password"
                { ...register('password', { required: true, minLength: 6 }) } />

            <button
            
            className="btn-primary">
                Crear cuenta
            </button>


            {/* divisor l ine */ }
            <div className="flex items-center my-5">
                <div className="flex-1 border-t border-gray-500"></div>
                <div className="px-2 text-gray-800">O</div>
                <div className="flex-1 border-t border-gray-500"></div>
            </div>

            <Link
                href="/auth/login" 
                className="btn-secondary text-center">
                Ingresaar
            </Link>

        </form>
    )
}
