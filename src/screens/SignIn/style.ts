import { sizes } from '@src/utils';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: sizes._16sdp,
  },
  logo: {
    width: sizes._132sdp,
    height: sizes._132sdp,
  },
  header: {},
  register: {
    alignSelf: 'center',
  },
  inputContainer: {},
  inputWrapper: {
    width: '100%',
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',
  },
});
