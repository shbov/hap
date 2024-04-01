export type LoginResponse = {
  id: number;
  name: string;
  email: string;
  accessToken: string;
  refreshToken: string;

  errors?: string[];
};

export type Token = Omit<LoginResponse, 'refreshToken'>;
