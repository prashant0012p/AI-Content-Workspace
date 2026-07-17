import { Button, Paper, TextField } from "@mui/material";

interface Props {
  content: string;
  onCopy: () => void;
  onSave: () => void;
  onChange: (value: string) => void;
}

const GeneratedContent = ({ content, onCopy, onSave, onChange }: Props) => {
  return (
    <Paper sx={{ p: 2 }}>
      <TextField
        multiline
        rows={15}
        fullWidth
        value={content}
        onChange={(event) => onChange(event.target.value)}
      />

      <Button sx={{ mt: 2 }} onClick={onCopy}>
        Copy
      </Button>

      <Button sx={{ mt: 2, ml: 2 }} variant="contained" onClick={onSave}>
        Save Draft
      </Button>
    </Paper>
  );
};

export default GeneratedContent;
