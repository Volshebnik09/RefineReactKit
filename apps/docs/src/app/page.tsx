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

export default function Home() {


    const f2 = form.useSelector(state => state)



    return (
        <div>
                <pre>
                    {JSON.stringify(f2, null, 2)}
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
        </div>
    );
}
