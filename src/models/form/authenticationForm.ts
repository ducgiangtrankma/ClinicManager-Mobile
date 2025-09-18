export interface SignInFormValuesEntity {
  email: string;
  password: string;
}
export interface SignUpFormValuesEntity {
  email: string;
  password: string;
  confirmPassword: string;
}
export type AuthFormValuesEntity = {
  email: string;
  password: string;
  confirmPassword?: string;
};

export interface ForgotPasswordValuesEntity {
  email: string;
}
export interface UpdatePasswordValuesEntity {
  otp: string;
  password: string;
  confirmPassword: string;
}
export type ForgotValuesEntity = {
  email?: string;
  otp?: string;
  password?: string;
  confirmPassword?: string;
};
