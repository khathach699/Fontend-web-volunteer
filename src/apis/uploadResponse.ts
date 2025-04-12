import { Volunteer } from "../types/profile";

export interface UploadResponse {
  success: boolean;
  message: string;
  data: {
    message?: string;
    user?: Volunteer;
    avatarUrl: string;
  };
}
