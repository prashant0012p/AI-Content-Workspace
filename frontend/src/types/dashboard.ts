export interface DashboardSummary {
  totalGenerated: number;
  totalDrafts: number;
  totalActivities: number;
}

export interface ActivityItem {
  _id: string;
  contentType: string;
  action: string;
  topic?: string;
  createdAt?: string;
}

export interface DraftItem {
  _id: string;
  contentType: string;
  topic: string;
  createdAt?: string;
}

export interface DashboardData {
  summary: DashboardSummary;
  recentGenerated: ActivityItem[];
  recentDrafts: DraftItem[];
  recentActivities: ActivityItem[];
}

export interface DashboardResponse {
  success: boolean;
  data: DashboardData;
}
