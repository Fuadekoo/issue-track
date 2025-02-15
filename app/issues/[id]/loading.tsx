import { Heading, Flex, Card, Box } from "@radix-ui/themes";
import { Skeleton } from "../../components/index";
const loading = () => {
  return (
    <Box>
      <Skeleton />
      <Flex className="space-x-3" my="2">
        <Skeleton width="5 rem" />
        <Skeleton />
      </Flex>
      <Card className="prose" mt="4">
        <Skeleton count="3" />
      </Card>
    </Box>
  );
};

export default loading;
