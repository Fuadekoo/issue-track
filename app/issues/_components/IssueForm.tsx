"use client";
import {
  Button,
  Callout,
  Spinner,
  TextField
} from "@radix-ui/themes";
import dynamic from "next/dynamic";
import { useState } from "react";
// import SimpleMDE from "react-simplemde-editor";
import ErrorMessage from "@/app/components/ErrorMessage";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue } from "@prisma/client";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { IssueSchema } from "../../validationSchema";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});
type IssueFormData = z.infer<typeof IssueSchema>;
// interface IssueForm {
//   title: string;
//   description: string;
// }

interface Props {
  issue?: Issue;
}

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(IssueSchema),
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  console.log(register("title"));
  const action = async (data: IssueFormData) => {
    try {
      setIsSubmitting(true);
      if (issue) {
        await axios.patch("/api/issues/" + issue.id, data);
      } else await axios.post("/api/issues", data);
      router.push("/issues");
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
        <TextField.Root
          defaultValue={issue?.title}
          placeholder="title.."
          {...register("title")}
        >
          <TextField.Slot />
        </TextField.Root>
        {<ErrorMessage>{errors.title?.message}</ErrorMessage>}
        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description}
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

export default IssueForm;
