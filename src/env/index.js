import { fetchDynamicConfig } from '@/framework/common';

export const initShopConfig = async () => {
  return await fetchDynamicConfig();
};
