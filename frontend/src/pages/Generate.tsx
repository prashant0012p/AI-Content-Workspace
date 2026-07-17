import { useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import { assistant, generateContent } from "../services/ai.service";
import { saveDraft } from "../services/draft.service";
import AssistantActions from "../components/AssistantActions";
import GeneratedContent from "../components/GeneratedContent";

const Generate = () => {
  const [form, setForm] = useState({
    contentType: "",
    topic: "",
    audience: "",
    tone: "",
    instructions: "",
  });
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleGenerate = async () => {
    setError("");

    if (!form.contentType || !form.topic || !form.audience || !form.tone) {
      setError("Please complete content type, topic, audience, and tone.");
      return;
    }

    setLoading(true);

    try {
      const { data } = await generateContent(form);
      setContent(data.data);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Generation failed");
    } finally {
      setLoading(false);
    }
  };

  const handleAssistant = async (action: string) => {
    setError("");

    if (!content) {
      setError("Generate content before using assistant.");
      return;
    }

    try {
      const { data } = await assistant({
        content,
        action,
      });

      setContent(data.data);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Assistant failed");
    }
  };

  const handleSave = async () => {
    setError("");

    if (!content) {
      setError("No generated content available to save.");
      return;
    }

    try {
      await saveDraft({
        ...form,
        content,
      });

      alert("Draft saved");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Save failed");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    alert("Copied");
  };

  return (
    <>
      <Typography variant="h4" sx={{ mb: 3 }}>
        AI Content Generator
      </Typography>

      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            select
            label="Content Type"
            name="contentType"
            value={form.contentType}
            onChange={handleChange}
          >
            <MenuItem value="LinkedIn Post">LinkedIn Post</MenuItem>
            <MenuItem value="Blog Article">Blog Article</MenuItem>
            <MenuItem value="Marketing Email">Marketing Email</MenuItem>
            <MenuItem value="Newsletter">Newsletter</MenuItem>
          </TextField>

          <TextField
            label="Topic"
            name="topic"
            value={form.topic}
            onChange={handleChange}
          />

          <TextField
            label="Target Audience"
            name="audience"
            value={form.audience}
            onChange={handleChange}
          />

          <TextField
            label="Tone"
            name="tone"
            value={form.tone}
            onChange={handleChange}
          />

          <TextField
            multiline
            rows={3}
            label="Additional Instructions"
            name="instructions"
            value={form.instructions}
            onChange={handleChange}
          />

          {error && (
            <Typography color="error">{error}</Typography>
          )}

          <Button variant="contained" onClick={handleGenerate} disabled={loading}>
            {loading ? "Generating..." : "Generate"}
          </Button>
        </Box>
      </Paper>

      {content && (
        <>
          <Box sx={{ mt: 3 }}>
            <AssistantActions onAction={handleAssistant} />
          </Box>

          <Box sx={{ mt: 3 }}>
            <GeneratedContent
              content={content}
              onCopy={handleCopy}
              onSave={handleSave}
              onChange={setContent}
            />
          </Box>
        </>
      )}
    </>
  );
};

export default Generate;
