import React from "react";
import { Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";

const statusMap: Record<
  Status,
  { label: string; color: "red" | "violet" | "green" }
> = {
  OPEN: { label: "OPEN", color: "red" },
  IN_PROGRESS: { label: "IN PROGRESS", color: "violet" },
  CLOSED: { label: "CLOSED", color: "green" },
};

const IssueStatusBadge = ({ status }: { status: Status }) => {
  // if(status === 'OPEN'){
  //   return (
  //     <Badge color='red'>OPEN</Badge>
  //   )
  // }
  return (
    <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
  );
};

export default IssueStatusBadge;
