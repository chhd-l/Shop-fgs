import { useEffect, useState } from 'react';
import { getDynamicLanguage } from '@/lang';

const useDynamicLanguage = () => {
  const [dynamicLanguage, setDynamicLanguage] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getLanguage = async () => {
      try {
        setLoading(true);
        const lang = await getDynamicLanguage();
        setDynamicLanguage(lang);
      } catch (err) {
        console.log('phrase langugage fetch error', err);
      } finally {
        setLoading(false);
      }
    };
    getLanguage();
  }, []);

  return [loading, dynamicLanguage];
};

export default useDynamicLanguage;
