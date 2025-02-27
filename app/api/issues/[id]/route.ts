import { IssueSchema } from "@/app/validationSchema";
import { PrismaClient } from "@prisma/client";
import delay from "delay";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();


export default async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const validation = IssueSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue) return NextResponse.json({ error: "invalid issue" });

  const updateIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: {
      title: body.title,
      description: body.description,
    },
  });
  return NextResponse.json(updateIssue);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await delay(1000);
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue) return NextResponse.json({ error: "invalid issue" });

  await prisma.issue.delete({
    where: { id: issue.id },
  });
  return NextResponse.json({ success: true });
}