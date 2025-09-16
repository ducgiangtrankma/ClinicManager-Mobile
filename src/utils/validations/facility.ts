import { TFunction } from 'i18next';
import * as Yup from 'yup';
export const createFacilityValidationSchema = (
  t: TFunction<'translation', undefined>,
) =>
  Yup.object().shape({
    name: Yup.string().required(t('facility_name_is_required')),
    address: Yup.string().required(t('facility_address_is_required')),
  });
