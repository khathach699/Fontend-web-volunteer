export interface Organization {
  Id: string;
  name: string;
  time: string;
  content: string;
  images: string[];
  avatar: string;
  totalCampaigns: number;
  totalVolunteers: number;
  campaigns: Campaign[];
  isVerified?: boolean;
}

export interface Campaign {
  name: string;
  stars: number;
  status: string;
  _id: string;
  thumbnail?: string;
  description?: string;
}

export interface OrganizationResponse {
  success: boolean;
  data: Organization;
  message?: string;
}
