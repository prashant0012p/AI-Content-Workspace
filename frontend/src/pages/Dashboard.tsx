import { useEffect, useState } from "react";
import {
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

import SummaryCard from "../components/SummaryCard";
import { getDashboard } from "../services/dashboard.service";
import type {
  DashboardData,
  ActivityItem,
  DraftItem,
} from "../types/dashboard";

const Dashboard = () => {
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async (): Promise<void> => {
      setLoading(true);
      setError("");

      try {
        const response = await getDashboard();
        setDashboard(response.data.data);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };

    void loadDashboard();
  }, []);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!dashboard) return <Typography>Nothing to display.</Typography>;

  return (
    <>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Dashboard
      </Typography>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 4 }}>
          <SummaryCard
            title="Total Generated"
            value={dashboard.summary.totalGenerated}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <SummaryCard
            title="Saved Drafts"
            value={dashboard.summary.totalDrafts}
          />
        </Grid>

       <Grid size={{ xs: 12, md: 4 }}>
          <SummaryCard
            title="AI Activities"
            value={dashboard.summary.totalActivities}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ mt: 3 }}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Recently Generated</Typography>

            <List>
              {dashboard.recentGenerated.map((item: ActivityItem) => (
                <ListItem key={item._id}>
                  <ListItemText
                    primary={item.contentType}
                    secondary={item.action}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>

          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Saved Drafts</Typography>

            <List>
              {dashboard.recentDrafts.map((item: DraftItem) => (
                <ListItem key={item._id}>
                  <ListItemText
                    primary={item.contentType}
                    secondary={item.topic}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

      <Grid size={{ xs: 12, md: 4 }}>

          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Recent AI Activity</Typography>

            <List>
              {dashboard.recentActivities.map((item: ActivityItem) => (
                <ListItem key={item._id}>
                  <ListItemText
                    primary={item.action}
                    secondary={item.contentType}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
