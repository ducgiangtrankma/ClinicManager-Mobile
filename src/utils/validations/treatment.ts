import { TFunction } from 'i18next';
import * as Yup from 'yup';

export const treatmentValidationSchema = (
  t: TFunction<'translation', undefined>,
) =>
  Yup.object().shape({
    implementation_date: Yup.string().required(t('value_not_empty')),
    note: Yup.string().required(t('value_not_empty')),
    cosmetics: Yup.array(),
    title: Yup.string().required(t('value_not_empty')),
  });

export const treatmentPaymentValidationSchema = (
  t: TFunction<'translation', undefined>,
) =>
  Yup.object().shape({
    total_treatment_fee: Yup.number().required(t('value_not_empty')),
    paid: Yup.number().required(t('value_not_empty')),
    debt: Yup.number().required(t('value_not_empty')),
    newPaid: Yup.number().required(t('value_not_empty')),
  });
