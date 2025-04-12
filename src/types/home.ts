import { ReactNode } from "react";

// Interface for API response
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// Define interface for activity items
export interface ActivityItem {
  id: string | number;
  logo: string;
  image: string;
  title: string;
  description: string;
}

// Define interface for member items
export interface MemberItem {
  avatar: string;
  title: string;
  number: number;
  start?: ReactNode;
}

// Define interface for campaign items
export interface CampaignItem {
  avatar: string;
  title: string;
  number: number;
  description?: string;
  content?: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  status?: string;
  targetAmount?: number;
  currentAmount?: number;
}

// Interface for featured user from API
export interface FeaturedUser {
  _id: string;
  fullname: string;
  avatar?: string;
  point: number;
}

// Interface for featured campaign from API
export interface FeaturedCampaign {
  _id: string;
  name: string;
  img?: string;
  images?: Array<{ imgUrl: string }>;
  participated: number;
  organization?: {
    Inform?: string;
    logo?: string;
  };
  content?: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  status?: string;
  targetAmount?: number;
  currentAmount?: number;
}

// Interface for featured activity from API
export interface FeaturedActivity {
  _id: string;
  name: string;
  content?: string;
  organization?: {
    Inform?: string;
    logo?: string;
  };
  organizationInfo?: {
    name?: string;
    logo?: string;
  };
  images?: Array<{ imgUrl: string }>;
  img?: string;
}
