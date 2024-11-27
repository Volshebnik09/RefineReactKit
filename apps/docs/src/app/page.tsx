"use client";
import {useForm} from "@refine-react-kit/form"
import {useState} from "react";

export default function Home() {
    const form = useForm({
        fields: {
            "main": {
                initialValue: "12312312"
            },
            "main.1": {}
        }
    })

    const [state, setState] = useState('')
    console.log(12412);
    return (
        <div>
            <pre>
                {JSON.stringify(form.fields, null, 2)}
            </pre>
            <form.Field
                field={form.fields["main"]}
                render={(props) =>
                    <input
                        {...props}
                    />
                }
            />
            <br/>
            <br/>
            <form.Field
                field={form.fields["main.1"]}
                render={(props) =>
                    <input
                        {...props}
                    />
                }
            />
        </div>
    );
}
