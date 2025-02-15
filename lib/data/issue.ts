"use server";
import { prisma } from "@/prisma/client";
import delay from "delay";

export async function getIssues() {
  const data = await prisma.issue.findMany();
  await delay(1000);
  return data;
}
