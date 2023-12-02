export interface AuthReq {
  userName: string;
  password: string;
  accessToken: string;
  refreshToken: string;
}

export interface AuthRes {
  email: string;
  accessToken: string;
  refreshToken: string;
  fullName: string;
  userId: string;
}

export interface ChangePasswordReq {
  applicationUserId: string | undefined;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
