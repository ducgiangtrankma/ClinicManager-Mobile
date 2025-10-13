import { TFunction } from 'i18next';
import * as Yup from 'yup';

export const scheduleValidationSchema = (
  t: TFunction<'translation', undefined>,
) =>
  Yup.object().shape({
    store: Yup.string().required(t('value_not_empty')),
    implementationDate: Yup.string().required(t('value_not_empty')),
  });
