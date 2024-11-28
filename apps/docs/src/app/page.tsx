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
        onChange: validation,
        onMount: validation
    }
})

const SubmitButton = () => {
    const canSubmit = form.useCanSubmit()

    return <button disabled={!canSubmit}>
        {canSubmit ? 'Submit' : 'Invalid'}
    </button>
}

export default function Home() {

    return (
        <div>
            <form.Field
                name={'password'}
                render={(props) =>
                    <div>
                        <input
                            value={props.value}
                            onChange={props.onChange}
                        />
                        <div>
                            {props.fieldMeta.touched ? props.fieldMeta.errors.join(', ') : ''}
                        </div>
                    </div>
                }
            />
            <br/>
            <br/>
            <form.Field
                name={'confirmPassword'}
                render={(props) =>
                    <div>
                        <input
                            value={props.value}
                            onChange={props.onChange}
                        />
                        <div>
                            {props.fieldMeta.touched ? props.fieldMeta.errors.join(', ') : ''}
                        </div>
                    </div>
                }
            />
            <br/>
            <SubmitButton/>
        </div>
    )
}
