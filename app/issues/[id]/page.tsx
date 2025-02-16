import { PrismaClient } from "@prisma/client";
import { Grid } from "@radix-ui/themes";
import delay from "delay";
import { notFound } from "next/navigation";
import IssueDetails from "./IssueDetails";
const prisma = new PrismaClient();

interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params }: Props) => {
  await delay(1000);
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) {
    return notFound();
  }

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <IssueDetails issue={issue} />
    </Grid>
  );
};

export default IssueDetailPage;
