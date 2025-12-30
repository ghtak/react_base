export interface ApiResponse<T> {
  code: string;
  message: string;
  data: T;
}

export interface UserDto {
  userId: string;
  userName: string;
  email: string;
  roles: 'ADMIN' | 'USER';
}
