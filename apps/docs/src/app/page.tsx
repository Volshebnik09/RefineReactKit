"use client";
import {useForm} from "@refine-react-kit/form"
import {z} from "zod";

const validation = z.object({
    password: z.string().min(3),
    confirmPassword: z.string().min(3)
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"]
})


const form = useForm({
    fields: {
        'password': {},
        'confirmPassword': {}
    },
    validators: {
        onChange: validation
    }
})

export default function Home() {

    const fields = form.useSelector((fields) => fields)

    const confirmationPasswordErrors = form.useSelector((fields) => fields.confirmPassword.errors)

        return <div>
            <form.Field
                name={'password'}
                render={(props) =>
                    <input
                        {...props}
                    />
                }
            />
            <br/>
            {fields.password.errors[0] || ''}
            <br/>
            <br/>
            <form.Field
                name={'confirmPassword'}
                render={(props) =>
                    <>
                        <input
                            {...props}
                        />
                    </>
                }
            />
            {confirmationPasswordErrors.length > 0 && <p>{confirmationPasswordErrors[0]}</p>}

            <br/>
            <br/>
            <pre>
            {JSON.stringify(fields, null, 2)}
            </pre>
        </div>
}
