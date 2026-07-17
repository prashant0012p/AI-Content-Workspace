import { useCallback, useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";

import SearchBar from "../components/SearchBar";
import DraftCard from "../components/DraftCard";

import { deleteDraft, getDrafts, updateDraft } from "../services/draft.service";

interface Draft {
  _id: string;
  content: string;
  contentType: string;
}

const Drafts = () => {
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  const loadDrafts = useCallback(async () => {
    try {
      const { data } = await getDrafts(search);
      setDrafts(data.data);
      setError("");
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to load drafts",
      );
    }
  }, [search]);

  useEffect(() => {
    let ignore = false;

    (async () => {
      try {
        const { data } = await getDrafts(search);
        if (!ignore) {
          setDrafts(data.data);
          setError("");
        }
      } catch (error) {
        if (!ignore) {
          setError(
            error instanceof Error ? error.message : "Failed to load drafts",
          );
        }
      }
    })();

    return () => {
      ignore = true;
    };
  }, [search]);

  const handleDelete = async (id: string) => {
    try {
      await deleteDraft(id);
      await loadDrafts();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Delete failed");
    }
  };

  const handleEdit = async (draft: Draft) => {
    const content = prompt("Edit Content", draft.content);

    if (!content) return;

    try {
      await updateDraft(draft._id, {
        content,
      });

      await loadDrafts();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Update failed");
    }
  };

  return (
    <>
      <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
        Drafts
      </Typography>

      <SearchBar value={search} onChange={setSearch} />

      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}

      <Grid container spacing={2} sx={{ mt: 2 }}>
        {drafts.length === 0 ? (
          <Grid size={{ xs: 12 }}>
            <Typography>No drafts found.</Typography>
          </Grid>
        ) : (
          drafts.map((draft) => (
            <Grid size={{ xs: 12, md: 6 }} key={draft._id}>
              <DraftCard
                draft={draft}
                onEdit={() => handleEdit(draft)}
                onDelete={() => handleDelete(draft._id)}
              />
            </Grid>
          ))
        )}
      </Grid>
    </>
  );
};

export default Drafts;
