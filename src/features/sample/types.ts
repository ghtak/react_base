export interface SampleData {
  id: number;
  name: string;
  start_date: string; // YYYY-MM-DD
  end_date: string; // YYYY-MM-DD
  created_at: string; // ISO string
  updated_at: string; // ISO string
}

export interface SampleSearchParams {
  name: string;
  startDate: string;
  endDate: string;
}
