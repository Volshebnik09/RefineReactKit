"use client";
import { createForm } from "@refine-react-kit/form";
import { z } from "zod";
import { Button, Input, Panel, Text } from "@refine-react-kit/ui";

const validation = z.object({
  password: z.string().min(3),
  email: z.string().email(),
});

const form = createForm({
  fields: {
    email: {},
    password: {},
  },
  validators: {
    onChange: validation,
    onMount: validation,
    beforeSubmit: validation,
  },
  onSubmit: async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    const values = Object.fromEntries(formData.entries());

    await sleep(1000);

    console.log(values);

    form.setFieldErrors({
      name: "password",
      errors: ["Server send error"],
    });
  },
});

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const useAnyFieldIsTouched = () => {
  const fields = form.useSelector((state) => state.fields);
  for (const fieldKey in fields) {
    const typedFieldKey = fieldKey as keyof typeof fields;
    if (fields[typedFieldKey].touched) {
      return true;
    }
  }
  return false;
};

const useCanSubmit = () => {
  const isLoading = form.useSelector((state) => state.isLoading);
  const haveErrors = form.useSelector((state) => state.haveErrors);
  const anyFieldIsTouched = useAnyFieldIsTouched();

  if (!anyFieldIsTouched) return true;

  return !isLoading && !haveErrors;
};

const FormButton = () => {
  const canSubmit = useCanSubmit();

  return <Button disabled={!canSubmit}>{"Войти"}</Button>;
};

export default function page() {
  return (
    <Panel
      style={{
        maxWidth: 500,
      }}
    >
      <Text.H1 style={{ textAlign: "center" }}>Авторизация</Text.H1>
      <form.Form>
        <form.Item
          name={"email"}
          render={(props) => (
            <Input
              name={props.fieldMeta.name}
              value={props.value as string}
              onChange={props.onChange}
              errors={props.fieldMeta.touched ? props.fieldMeta.errors : []}
              label={"Почта"}
            />
          )}
        />
        <form.Item
          name={"password"}
          render={(props) => (
            <Input
              name={props.fieldMeta.name}
              value={props.value as string}
              onChange={props.onChange}
              errors={props.fieldMeta.touched ? props.fieldMeta.errors : []}
              label={"Пароль"}
            />
          )}
        />
        <br />
        <FormButton />
      </form.Form>
    </Panel>
  );
}
