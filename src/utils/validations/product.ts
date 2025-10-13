import { TFunction } from 'i18next';
import * as Yup from 'yup';

export const productValidationSchema = (
  t: TFunction<'translation', undefined>,
) =>
  Yup.object().shape({
    sku: Yup.string().required(t('value_not_empty')),
    store: Yup.string().required(t('value_not_empty')),
    category: Yup.object().required(t('value_not_empty')),
    name: Yup.string().required(t('value_not_empty')),
    inventory: Yup.number()
      .typeError(t('value_must_be_number'))
      .required(t('value_not_empty'))
      .min(0, t('value_must_be_greater_than_or_equal_to_0')),
    price: Yup.number()
      .typeError(t('value_must_be_number'))
      .required(t('value_not_empty')),
    originPrice: Yup.number()
      .typeError(t('value_must_be_number'))
      .required(t('value_not_empty'))
      .max(Yup.ref('price'), t('origin_price_cannot_exceed_price')),
    description: Yup.string().optional(),
  });
