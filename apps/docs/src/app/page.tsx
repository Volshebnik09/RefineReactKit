"use client";
import {useForm} from "@refine-react-kit/form"
import {useState} from "react";
import {z} from "zod";

const validation = z.object({
    main: z.string().min(2)
})

validation.safeParse({
    main: '123'
})

export default function Home() {
    const form = useForm({
        fields: {
            "main": {
                initialValue: "12312312"
            },
            "main.1": {}
        },
        validators: {
            onChange: validation
        }
    })



    return (
        <div>
            <form.Form>
                <pre>
                    {/*{JSON.stringify(formContext?.fields, null, 2)}*/}
                </pre>
                <form.Field
                    name={'main'}
                    render={(props) =>
                        <input
                            {...props}
                        />
                    }
                />
                <br/>
                <br/>
                <form.Field
                    name={'main.1'}
                    render={(props) =>
                        <>
                            <input
                                {...props}
                            />
                        </>

                    }
                />
            </form.Form>
        </div>
    );
}
