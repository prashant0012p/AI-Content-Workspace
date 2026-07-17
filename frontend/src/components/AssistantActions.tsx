import { Button, Stack } from "@mui/material";

interface Props {
  onAction: (action: string) => void;
}

const AssistantActions = ({ onAction }: Props) => {
  return (
    <Stack direction="row" spacing={2} sx={{ flexWrap: "wrap" }}>
      <Button onClick={() => onAction("Rewrite")}>Rewrite</Button>

      <Button onClick={() => onAction("Expand")}>Expand</Button>

      <Button onClick={() => onAction("Shorten")}>Shorten</Button>

      <Button onClick={() => onAction("Improve Readability")}>Improve</Button>

      <Button onClick={() => onAction("Stronger CTA")}>CTA</Button>

      <Button onClick={() => onAction("Alternative Version")}>
        Alternative
      </Button>
    </Stack>
  );
};

export default AssistantActions;
