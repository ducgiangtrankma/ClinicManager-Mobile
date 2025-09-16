const COLORS = {
  primaryGreen: '#6B8E23', // Olive Green - màu chủ đạo vintage
  white: '#FAF3E0', // Cream White - tone nền sáng dịu
  black: '#2E2E2E', // Retro Black - không quá đậm
  textGray: '#A1887F', // Dusty Taupe - màu chữ nhẹ nhàng
  errorRed: '#D2691E', // Burnt Orange - thay cho đỏ lỗi quá mạnh
  borderGray: '#C8BEB4', // Soft Beige Gray - đường viền dịu nhẹ
  neutralGray: '#B0A295', // Retro Neutral Gray
  lightGreenBackground: '#F1EFE5', // Vintage light background (gợi nhớ giấy cũ)
  grayBackground: '#DDD0C8', // Gray Beige - nền nhẹ
  blackGray: '#4B3F39', // Charcoal Brown - cho text đậm
  content: '#666666',
  dot: '#CCCCCC',
  red: 'red',
  whiteBase: '#FFFFFF',
  // white2: '#FFE0B2',
  // white2: '#FFECB3',
  white2: '#DCEDC8',
  errorRed2: '#ef5350',
};
export const Gradients = {
  gradientGreen:
    'linear-gradient(90deg, rgba(0,255,188,1) 0%, rgba(0,199,87,1) 100%)',
  gradientBlue:
    'linear-gradient(90deg, rgba(66,133,244,1) 0%, rgba(25,103,255,1) 100%)',
  gradientPurple:
    'linear-gradient(90deg, rgba(150,78,250,1) 0%, rgba(92,0,255,1) 100%)',
  gradientYellow:
    'linear-gradient(90deg, rgba(255,234,100,1) 0%, rgba(255,195,0,1) 100%)',
  gradientRed:
    'linear-gradient(90deg, rgba(255,112,130,1) 0%, rgba(255,53,53,1) 100%)',
  gradientBlack:
    'linear-gradient(90deg, rgba(50,50,50,1) 0%, rgba(0,0,0,1) 100%)',
};

export const DarkColors = {
  //
  while: COLORS.white,
  black: COLORS.black,
  green: COLORS.primaryGreen,
  divider: COLORS.borderGray,
  defaultPageBackground: COLORS.white,
  defaultTextColor: COLORS.white,
  headerBorderBackground: COLORS.grayBackground,
  activityIndicatorColor: COLORS.primaryGreen,
  bottomSheetDivider: COLORS.borderGray,
  inputPlaceholderText: COLORS.content,
  inputFocusBackground: '',
  inputBackground: '',
  inputFocusBorder: COLORS.blackGray,
  inputOutFocusBorder: COLORS.borderGray,
  cancelButton: COLORS.borderGray,
  grayBackground: COLORS.grayBackground,
  blackGray: COLORS.blackGray,
  defaultButtonBackground: COLORS.primaryGreen,
  defaultButtonTitle: COLORS.white,
};
export const LightColors = {
  //
  while: COLORS.white,
  black: COLORS.black,
  error: COLORS.errorRed,
  divider: COLORS.borderGray,
  defaultTextColor: COLORS.black,
  defaultPageBackground: COLORS.white,
  headerBorderBackground: COLORS.grayBackground,
  activityIndicatorColor: COLORS.primaryGreen,
  bottomSheetDivider: COLORS.borderGray,
  inputPlaceholderText: COLORS.content,
  inputFocusBackground: '',
  inputBackground: '',
  inputFocusBorder: COLORS.blackGray,
  inputOutFocusBorder: COLORS.borderGray,
  green: COLORS.primaryGreen,
  cancelButton: COLORS.borderGray,
  grayBackground: COLORS.grayBackground,
  blackGray: COLORS.blackGray,
  defaultButtonBackground: COLORS.primaryGreen,
  defaultButtonTitle: COLORS.white,
};
