import { Tooltip } from "@/components/ui/tooltip";
import { Badge, HStack, IconButton, Table, Text } from "@chakra-ui/react";
import { format } from "date-fns";
import { ExternalLinkIcon } from "lucide-react";
import { StatusMenu } from "../status-menu";
import type { SuccessStoryType } from "@/lib/mongodb/models/success-story";

export function DataTable({ items }: { items: SuccessStoryType[] }) {
  return (
    <Table.ScrollArea borderWidth="1px">
      <Table.Root size="sm" variant="outline">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Name</Table.ColumnHeader>
            <Table.ColumnHeader>Role</Table.ColumnHeader>
            <Table.ColumnHeader>Course</Table.ColumnHeader>
            <Table.ColumnHeader>Batch</Table.ColumnHeader>
            <Table.ColumnHeader>Trainer</Table.ColumnHeader>
            <Table.ColumnHeader>Employed</Table.ColumnHeader>
            <Table.ColumnHeader>Company</Table.ColumnHeader>
            <Table.ColumnHeader>Designation</Table.ColumnHeader>
            <Table.ColumnHeader>Status</Table.ColumnHeader>
            <Table.ColumnHeader>Created At</Table.ColumnHeader>
            <Table.ColumnHeader>Updated At</Table.ColumnHeader>
            <Table.ColumnHeader>Actions</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {items.map((item) => {
            const status = item.status ?? "pending";
            const statusColor =
              status === "approved"
                ? "green"
                : item.status === "declined"
                ? "red"
                : "gray";
            return (
              <Table.Row key={item._id}>
                <Table.Cell>{item.name}</Table.Cell>
                <Table.Cell>
                  <Badge textTransform={"capitalize"} colorPalette={"purple"}>
                    {item.role}
                  </Badge>
                </Table.Cell>
                <Table.Cell>
                  <Text w={"250px"} fontSize={"sm"} lineClamp={2}>
                    {item.course}
                  </Text>
                </Table.Cell>
                <Table.Cell>
                  {item.batch ? <Badge>G-{item.batch}</Badge> : ""}
                </Table.Cell>
                <Table.Cell>
                  <Text w={"200px"} fontSize={"sm"} lineClamp={2}>
                    {item.trainer}
                  </Text>
                </Table.Cell>
                <Table.Cell>
                  <Badge textTransform={"capitalize"}>
                    {item.employed ? "Employed" : "Unemployed"}
                  </Badge>
                </Table.Cell>
                <Table.Cell>
                  <Text w={"150px"} fontSize={"sm"} lineClamp={2}>
                    {item.company}
                  </Text>
                </Table.Cell>
                <Table.Cell>
                  <Text w={"200px"} fontSize={"sm"} lineClamp={2}>
                    {item.designation}
                  </Text>
                </Table.Cell>
                <Table.Cell>
                  <Badge
                    textTransform={"capitalize"}
                    colorPalette={statusColor}
                  >
                    {status}
                  </Badge>
                </Table.Cell>

                <Table.Cell>
                  <Text fontSize={"sm"}>
                    {format(new Date(item.createdAt), "PPP")}
                  </Text>
                </Table.Cell>
                <Table.Cell>
                  <Text fontSize={"sm"}>
                    {format(new Date(item.updatedAt), "PPP")}
                  </Text>
                </Table.Cell>

                <Table.Cell>
                  <HStack>
                    <Tooltip content="View story">
                      <IconButton size={"xs"} asChild variant={"outline"}>
                        <a
                          target="_blank"
                          href={`/success-stories/${item._id}`}
                        >
                          <ExternalLinkIcon />
                        </a>
                      </IconButton>
                    </Tooltip>
                    <StatusMenu id={item._id} status={item.status} />
                  </HStack>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
    </Table.ScrollArea>
  );
}
