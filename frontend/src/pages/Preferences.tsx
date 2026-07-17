import { useEffect, useState } from "react";
import { Button, MenuItem, Paper, TextField, Typography } from "@mui/material";
import {
  getPreferences,
  updatePreferences,
} from "../services/preference.service";

const Preferences = () => {
  const [form, setForm] = useState({
    preferredModel: "",
    creativity: "",
    writingStyle: "",
    systemPrompt: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPreferences = async (): Promise<void> => {
      setError("");
      setLoading(true);

      try {
        const { data } = await getPreferences();
        setForm({
          preferredModel: data.data.preferredModel ?? "",
          creativity: data.data.creativity ?? "",
          writingStyle: data.data.writingStyle ?? "",
          systemPrompt: data.data.systemPrompt ?? "",
        });
      } catch (error) {
        setError(error instanceof Error ? error.message : "Failed to load preferences");
      } finally {
        setLoading(false);
      }
    };

    void loadPreferences();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    setError("");

    try {
      await updatePreferences(form);
      alert("Preferences Updated");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Save failed");
    }
  };

  if (loading) {
    return <Typography>Loading preferences...</Typography>;
  }

  return (
    <>
      <Typography variant="h4" sx={{ mb: 3 }}>
        AI Preferences
      </Typography>

      <Paper sx={{ p: 3 }}>
        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        <TextField
          select
          fullWidth
          label="Model"
          name="preferredModel"
          value={form.preferredModel}
          onChange={handleChange}
          margin="normal"
        >
          <MenuItem value="gemini-2.5-flash">Gemini 2.5 Flash</MenuItem>
        </TextField>

        <TextField
          select
          fullWidth
          label="Creativity"
          name="creativity"
          value={form.creativity}
          onChange={handleChange}
          margin="normal"
        >
          <MenuItem value="Low">Low</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="High">High</MenuItem>
        </TextField>

        <TextField
          fullWidth
          label="Writing Style"
          name="writingStyle"
          value={form.writingStyle}
          onChange={handleChange}
          margin="normal"
        />

        <TextField
          fullWidth
          multiline
          rows={4}
          label="System Prompt"
          name="systemPrompt"
          value={form.systemPrompt}
          onChange={handleChange}
          margin="normal"
        />

        <Button sx={{ mt: 2 }} variant="contained" onClick={handleSave}>
          Save
        </Button>
      </Paper>
    </>
  );
};

export default Preferences;
