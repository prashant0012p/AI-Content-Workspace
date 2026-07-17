export interface CreateDraftBody {
  contentType: string;
  topic: string;
  audience: string;
  tone: string;
  instructions?: string;
  content: string;
}

export interface UpdateDraftBody {
  contentType?: string;
  topic?: string;
  audience?: string;
  tone?: string;
  instructions?: string;
  content?: string;
}
