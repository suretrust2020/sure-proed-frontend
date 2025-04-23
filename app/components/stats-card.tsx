import { Box, StatLabel, StatRoot, StatValueText } from "@chakra-ui/react";

export function StatsCard({
  icon,
  label,
  count,
  showPlus,
}: {
  icon?: React.ReactNode;
  label: string;
  count: number;
  showPlus?: boolean;
}) {
  return (
    <StatRoot
      key={label}
      px={6}
      py={4}
      shadow={"sm"}
      borderWidth={"1px"}
      rounded={"lg"}
      h="full"
      bg={"bg.panel"}
      alignItems={"center"}
    >
      {icon && <Box mb={4}>{icon}</Box>}
      <StatValueText fontSize={"2xl"} fontWeight={"bold"}>
        {count}
        {showPlus && "+"}
      </StatValueText>
      <StatLabel fontSize={"md"}>{label}</StatLabel>
    </StatRoot>
  );
}
