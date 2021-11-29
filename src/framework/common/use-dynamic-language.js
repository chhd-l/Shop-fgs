import { useEffect, useState } from 'react';
import { getDynamicLanguage } from '@/lang';

const useDynamicLanguage = () => {
  const [dynamicLanguage, setDynamicLanguage] = useState({});
  const [loading, setLoading] = useState(true);
  console.log(dynamicLanguage, 'dynamicLanguage');

  useEffect(() => {
    async function getLanguage() {
      setLoading(true);
      const lang = await getDynamicLanguage();
      setDynamicLanguage(lang);
      setLoading(false);
    }
    getLanguage();
  }, []);

  return [loading, dynamicLanguage];
};

export default useDynamicLanguage;
