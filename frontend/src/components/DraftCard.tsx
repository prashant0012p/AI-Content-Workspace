import { Card, CardContent, Typography, Button, Stack } from "@mui/material";

interface Draft {
  contentType: string;
  topic?: string;
}

interface Props {
  draft: Draft;
  onEdit: () => void;
  onDelete: () => void;
}

const DraftCard = ({ draft, onEdit, onDelete }: Props) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{draft.contentType}</Typography>

        <Typography>{draft.topic}</Typography>

        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          <Button onClick={onEdit}>Edit</Button>

          <Button color="error" onClick={onDelete}>
            Delete
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default DraftCard;
