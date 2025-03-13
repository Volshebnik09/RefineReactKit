"use client";
import {createForm} from "@refine-react-kit/form"
import {z} from "zod";
import {Button, Input} from "@refine-react-kit/ui";

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

const form = createForm({
    fields: {
        'password': {
            initialValue: '123',
        },
        'confirmPassword': {},
        'image': {},
        'otherTextField': {}
    },
    validators: {
        onChange: validation,
        onMount: validation,
        beforeSubmit: validation
    },
    onSubmit: async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement)

        const values = Object.fromEntries(formData.entries());

        await sleep(1000)

        console.log(values)

        form.setFieldErrors({
            name: 'password',
            errors: ['Error']
        })

    }
})

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const Fields = () => {
    const fields = form.useSelector(state => state.fields)
    return (
        <pre>
            {JSON.stringify(fields, null, 2)}
        </pre>
    )
}

const FormButton = () => {

    const isLoading = form.useSelector(state => state.isLoading)
    const haveErrors = form.useSelector(state => state.haveErrors)

    const canSubmit = !isLoading && !haveErrors

    const message = isLoading ? 'Loading' : haveErrors ? 'Error' : 'Submit'

    return <Button disabled={!canSubmit}>
        {message}
    </Button>
}

export default function Home() {

    return (
        <form.Form>
            <form.Item
                name={'password'}
                render={(props) =>
                    <Input
                        name={props.fieldMeta.name}
                        value={props.value as string}
                        onChange={props.onChange}
                        errors={props.fieldMeta.touched && props.fieldMeta.errors}
                        label={'password'}
                    />
                }
            />
            <form.Item
                name={'confirmPassword'}
                render={(props) =>
                    <Input
                        name={props.fieldMeta.name}
                        value={props.value as string}
                        onChange={props.onChange}
                        errors={props.fieldMeta.touched && props.fieldMeta.errors}
                        label={'confirmPassword'}
                    />
                }
            />
            <form.Item
                name={'image'}
                render={(props) =>
                    <Input
                        name={props.fieldMeta.name}
                        value={props.value as string}
                        onChange={props.onChange}
                        errors={props.fieldMeta.touched && props.fieldMeta.errors}
                        type={'file'}
                        label={'image'}
                    />
                }
            />
            <form.Item
                name={'otherTextField'}
                render={(props) =>
                    <Input
                        name={props.fieldMeta.name}
                        value={props.value as string}
                        onChange={props.onChange}
                        errors={props.fieldMeta.touched && props.fieldMeta.errors}
                        type={'text'}
                        label={'otherTextField'}
                    />
                }
            />
            <FormButton/>
            <Fields/>
            <br/>
        </form.Form>
    )
}
