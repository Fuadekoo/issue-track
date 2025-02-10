"use client";
import React, { useState } from "react";
import { TextField, TextArea, Button, Callout, Text } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller, set } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "../../validationSchema";
import { z } from "zod";

type IssueForm = z.infer<typeof createIssueSchema>;
// interface IssueForm {
//   title: string;
//   description: string;
// }
const NewIssuePage = () => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });
  const [error, setError] = useState("");
  console.log(register("title"));
  const action = async (data: IssueForm) => {
    try {
      const response = await axios.post("/api/issues", data);
      router.push("/issues");
      console.log(response);
    } catch (error) {
      console.error(error);
      setError("unexpected error");
    }
  };

  return (
    <div className="max-w-xl space-y-3">
      {error && (
        <Callout.Root className="mb-5">
          <Callout.Icon>{/* <InfoCircledIcon /> */}</Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}

      <form className="space-y-3" onSubmit={handleSubmit(action)}>
        <TextField.Root placeholder="title.." {...register("title")}>
          <TextField.Slot />
        </TextField.Root>
        {errors.title && (
          <Text color="red" as="p">
            {errors.title.message}
          </Text>
        )}
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Reply to comment…" {...field} />
          )}
        />
        {errors.description && (
          <Text color="red" as="p">
            {errors.description.message}
          </Text>
        )}

        <Button>submit new issues</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
