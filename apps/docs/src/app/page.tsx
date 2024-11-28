"use client";
import {useForm} from "@refine-react-kit/form"
import {z} from "zod";

const validation = z.object({
    password: z.string().min(3),
    confirmPassword: z.string().min(3),
    // image: z.string().url(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"]
})

const form = useForm({
    fields: {
        'password': {},
        'confirmPassword': {},
        'image': {}
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
            <form
                onSubmit={e => {
                    e.preventDefault()
                    const formData = new FormData(e.target as HTMLFormElement)
                    console.log(formData.entries());

                    const values = Object.fromEntries(formData.entries());
                    console.log(values); // { username: "value", email: "value" }

                }}
            >
                <form.Field
                    name={'password'}
                    render={(props) =>
                        <div>
                            <input
                                name={props.fieldMeta.name}
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
                <form.Field
                    name={'image'}
                    render={(props) =>
                        <div>
                            <input
                                value={props.value}
                                onChange={props.onChange}
                                type={'file'}
                            />
                            <div>
                                {props.fieldMeta.touched ? props.fieldMeta.errors.join(', ') : ''}
                            </div>
                        </div>
                    }
                />
                <br/>
                <SubmitButton/>
            </form>

        </div>
    )
}
