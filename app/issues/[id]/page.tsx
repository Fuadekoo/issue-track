import React from "react";
import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import delay from "delay";
import { Box, Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import ReactMarkdown from "react-markdown";
import { Pencil2Icon } from "@radix-ui/react-icons";
import Link from "next/link";
import EditIssueButton from "./edit/EditIssueButton"
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
     
    </Grid>
  );
};

export default IssueDetailPage;
