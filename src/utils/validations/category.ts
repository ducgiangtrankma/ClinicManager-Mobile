import { TFunction } from 'i18next';
import * as Yup from 'yup';

export const categoryValidationSchema = (
  t: TFunction<'translation', undefined>,
) =>
  Yup.object().shape({
    sku: Yup.string().required(t('value_not_empty')),
    store: Yup.string().required(t('value_not_empty')),
    name: Yup.string().required(t('value_not_empty')),
  });
