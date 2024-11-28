"use client";
import {TForm, useForm} from "@refine-react-kit/form"
import {z} from "zod";

const validation = z.object({
    password: z.string().min(3),
    confirmPassword: z.string().min(3),
    image: z.custom<File>()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"]
}).refine((data) => data.image instanceof File, {
    message: 'Image must be a file',
    path: ['image']
}).refine(data => data.image.type === 'image/jpeg' || data.image.type === 'image/png', {
    message: 'Image must be a jpeg or png',
    path: ['image']
})

const SubmitButton = (props: {
    form: TForm
}) => {
    const canSubmit = props.form.useCanSubmit()

    return <button disabled={!canSubmit}>
        {canSubmit ? 'Submit' : 'Invalid'}
    </button>
}

export default function Home() {


    const form = useForm({
        fields: {
            'password': {
                initialValue: '123'
            },
            'confirmPassword': {},
            'image': {}
        },
        validators: {
            onChange: validation,
            onMount: validation
        }
    })

    return (
        <div>
            <form
                ref={form.formRef}
                onSubmit={e => {
                    e.preventDefault()
                    const formData = new FormData(e.target as HTMLFormElement)

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
                                value={props.value as string}
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
                                name={props.fieldMeta.name}
                                value={props.value as string}
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
                                name={props.fieldMeta.name}
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
                <SubmitButton form={form}/>
            </form>

        </div>
    )
}
