import { TFunction } from 'i18next';
import * as Yup from 'yup';
import { phoneError, phoneRegex } from '../regex';
export const createCustomerValidationSchema = (
  t: TFunction<'translation', undefined>,
) =>
  Yup.object().shape({
    name: Yup.string().required(t('customer_form_name_required')),
    phoneNumber: Yup.string()
      .required(t('phoneNumber_not_valid'))
      .matches(phoneRegex, phoneError),
  });
