"use client";
import React, { useState } from "react";
import {
  TextField,
  TextArea,
  Button,
  Callout,
  Text,
  Spinner,
} from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller, set } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "../../validationSchema";
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  console.log(register("title"));
  const action = async (data: IssueForm) => {
    try {
      setIsSubmitting(true);
      const response = await axios.post("/api/issues", data);
      router.push("/issues");
      console.log(response);
    } catch (error) {
      setIsSubmitting(false);
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
        {<ErrorMessage>{errors.title?.message}</ErrorMessage>}
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Reply to comment…" {...field} />
          )}
        />
        {<ErrorMessage>{errors.description?.message}</ErrorMessage>}

        <Button disabled={isSubmitting} type="submit">
          submit new issues {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
