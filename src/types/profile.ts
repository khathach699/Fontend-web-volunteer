export interface Volunteer {
  _id: string;
  fullname: string;
  email: string;
  point: number;
  avatar?: string;
  isdisable: boolean;
  role: {
    _id: string;
    name: string;
    description: string;
    isdeleted: boolean;
  };
  isdeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse {
  success: boolean;
  data: {
    user: Volunteer;
  };
}

export interface ListVolunteerResponse {
  success: boolean;
  data: {
    result: {
      users: Volunteer[];
      total: number;
      totalPages: number;
      currentPage: number;
    };
  };
}

export interface Activity {
  name: string;
  points: number;
  status: string;
  completed: boolean;
  orgname: string;
}
