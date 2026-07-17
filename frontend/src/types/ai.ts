export interface GenerateContentParams {
  contentType: string;
  topic: string;
  audience: string;
  tone: string;
  instructions?: string;
  writingStyle?: string;
  systemPrompt?: string;
  model?: string;
}

export interface AssistantRequestBody {
  content: string;
  action: string;
  model?: string;
}
