"use client";
import React, { useState } from "react";
import { TextField, TextArea, Button, Callout } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller, set } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

interface IssueForm {
  title: string;
  description: string;
}
const NewIssuePage = () => {
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<IssueForm>();
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
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Reply to comment…" {...field} />
          )}
        />

        <Button>submit new issues</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
