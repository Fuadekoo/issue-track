import { IssueStatusBadge } from "@/app/components";
import { Issue } from "@prisma/client";
import { Box, Card, Flex, Heading, Text } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";
import EditIssueButton from "./edit/EditIssueButton";
const IssueDetails = ({issue}:{issue:Issue}) => {
  return (
    <>
      <Box>
        <Box>
          <Heading>{issue.title}</Heading>
          <Flex className="space-x-3" my="2">
            <IssueStatusBadge status={issue.status} />
            <Text>{issue.createdAt.toDateString()}</Text>
          </Flex>
          <Card className="prose" mt="4">
            <ReactMarkdown>{issue.description}</ReactMarkdown>
          </Card>
        </Box>
        <Box>
          <EditIssueButton issueId={issue.id} />
        </Box>
      </Box>
    </>
  );
};

export default IssueDetails;
