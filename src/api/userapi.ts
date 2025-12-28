import client from "./client";
import type { ApiResponse, UserDto } from "./dto";

export const fetchUsers = async (): Promise<UserDto[]> => {
  const response = await client.get<ApiResponse<UserDto[]>>("/users");
  return response.data.data;
};

/*
Omit<UserDto, 'userId'>는 TypeScript에서 제공하는 Utility Type 중 하나로,
기존 타입에서 특정 속성(Key)을 제거한 새로운 타입을 만들 때 사용합니다.
*/
export const createUser = async (user: Omit<UserDto, 'userId'>): Promise<UserDto> => {
  const response = await client.post<ApiResponse<UserDto>>("/users", user);
  return response.data.data;
};