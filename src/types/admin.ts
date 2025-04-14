export interface ListVolunteerResponse {
  success: boolean;
  data: {
    result: {
      users: [];
      total: number;
      totalPages: number;
      currentPage: number;
    };
  };
}