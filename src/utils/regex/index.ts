export const stringRegex = /^(.|\s){6,256}$/;
export const stringError = 'Nội dung phải từ 6 đến 256 ký tự.';
export const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\S]{8,16}$/;
export const passwordError =
  'Mật khẩu từ 8 đến 16 kí tự không có khoảng trắng (bao gồm ít nhất 1 chữ và 1 số)';
export const usernameRegex = /^[a-zA-Z0-9]{6,20}$/g;
export const usernameError =
  'Tên tài khoản chỉ bao gồm chữ hoa, chữ thường và số, từ 6 - 20 ký tự';
// export const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
export const phoneRegex = /^(0|\+84)[3|5|7|8|9]\d{8}$/;

export const phoneError = 'Vui lòng điền đúng định dạng số điện thoại';
export const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const emailError = 'Email không đúng định dạng';
export const otpRegex = /^\d{6}$/;
export const otpError = 'Vui lòng điền mã OTP được gửi về số điện thoại';
