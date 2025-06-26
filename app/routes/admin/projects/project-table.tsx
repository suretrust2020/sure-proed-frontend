import { Avatar } from "@/components/ui/avatar";
import { Tooltip } from "@/components/ui/tooltip";
import type { ProjectType } from "@/lib/mongodb/models/projects";
import type { Course } from "@/lib/types";
import {
  Badge,
  Checkbox,
  HStack,
  IconButton,
  Table,
  Text,
} from "@chakra-ui/react";
import { format } from "date-fns";
import { ExternalLinkIcon } from "lucide-react";
import { StatusMenu } from "../status-menu";
import { useState } from "react";
import { AdminActionBar } from "../admin-action-bar";

export function ProjectsTable({
  items,
}: {
  items: (ProjectType & { course: Course })[];
}) {
  const [selection, setSelection] = useState<string[]>([]);
  const hasSelection = selection.length > 0;
  const indeterminate = hasSelection && selection.length < items.length;
  return (
    <>
      <Table.ScrollArea borderWidth="1px">
        <Table.Root size="sm" variant="outline">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader w="6">
                <Checkbox.Root
                  size="sm"
                  top="0.5"
                  aria-label="Select all rows"
                  checked={
                    indeterminate ? "indeterminate" : selection.length > 0
                  }
                  onCheckedChange={(changes) => {
                    setSelection(
                      changes.checked ? items.map((item) => item._id) : []
                    );
                  }}
                >
                  <Checkbox.HiddenInput />
                  <Checkbox.Control />
                </Checkbox.Root>
              </Table.ColumnHeader>
              <Table.ColumnHeader>Author</Table.ColumnHeader>
              <Table.ColumnHeader>Project Name</Table.ColumnHeader>
              <Table.ColumnHeader>Course</Table.ColumnHeader>
              <Table.ColumnHeader>Status</Table.ColumnHeader>
              <Table.ColumnHeader>Description</Table.ColumnHeader>
              <Table.ColumnHeader>Created Date</Table.ColumnHeader>
              <Table.ColumnHeader>Language</Table.ColumnHeader>
              <Table.ColumnHeader>More</Table.ColumnHeader>
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
                  <Table.Cell>
                    <Checkbox.Root
                      size="sm"
                      top="0.5"
                      aria-label="Select row"
                      checked={selection.includes(item._id)}
                      onCheckedChange={(changes) => {
                        setSelection((prev) =>
                          changes.checked
                            ? [...prev, item._id]
                            : selection.filter((id) => id !== item._id)
                        );
                      }}
                    >
                      <Checkbox.HiddenInput />
                      <Checkbox.Control />
                    </Checkbox.Root>
                  </Table.Cell>
                  <Table.Cell>
                    <HStack>
                      <Avatar
                        width={6}
                        height={6}
                        src={item.authorAvatar}
                        name={item.author}
                        rounded={"md"}
                      />
                      <Text fontSize={"sm"}> {item.author}</Text>
                    </HStack>
                  </Table.Cell>
                  <Table.Cell>
                    <Text fontSize={"sm"} lineClamp={1}>
                      {item.name}
                    </Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Text w={"200px"} fontSize={"sm"} lineClamp={2}>
                      {item.course ? item.course.course_name : "N/A"}
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
                    <Text w={"500px"} lineClamp={2}>
                      {item.description}
                    </Text>
                  </Table.Cell>

                  <Table.Cell>
                    <Text fontSize={"sm"}>
                      {format(new Date(item.createdAt), "PPP")}
                    </Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Text fontSize={"sm"} w="100px">
                      {item.language}
                    </Text>
                  </Table.Cell>

                  <Table.Cell>
                    <HStack>
                      <Tooltip content="Open project">
                        <IconButton size={"xs"} asChild variant={"outline"}>
                          <a target="_blank" href={item.link}>
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
      <AdminActionBar
        open={hasSelection}
        selection={selection}
        handleClear={() => setSelection([])}
      />
    </>
  );
}
