import { fetchDynamicConfig } from '@/framework/common';
import ca from '@/env/ca';
import core from '@/env/core';
import de from '@/env/de';
import fr from '@/env/fr';
import mx from '@/env/mx';
import ru from '@/env/ru';
import se from '@/env/se';
import tr from '@/env/tr';
import uk from '@/env/uk';
import us from '@/env/us';

export const initShopConfig = async () => {
  return await fetchDynamicConfig();
};
export const baseStoreConfigByCountry = {
  ca,
  core,
  de,
  fr,
  mx,
  ru,
  se,
  tr,
  uk,
  us
};
