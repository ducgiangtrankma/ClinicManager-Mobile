import en from './resources/en.json';
import vi from './resources/vi.json';
// Union type để bao gồm tất cả các key có thể có trong các tệp JSON
type TranslationKeys =
  | keyof (typeof en)['translation']
  | keyof (typeof vi)['translation'];

export default TranslationKeys;
