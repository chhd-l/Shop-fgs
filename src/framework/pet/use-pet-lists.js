import { useState, useEffect } from 'react';
import { getPetList } from '@/api/pet';

const usePetLists = ({ loginStore, paymentStore }) => {
  const { isLogin, userInfo } = loginStore;
  const { setPetList } = paymentStore;
  const [loading, setLoading] = useState(false);
  const [refreshList, setRefreshList] = useState(true);

  const fetchPetList = async () => {
    setLoading(true);
    try {
      const res = await getPetList({
        customerId: userInfo.customerId,
        consumerAccount: userInfo.customerAccount
      });
      setPetList(res.context.context);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (refreshList && isLogin) {
      setRefreshList(false);
      fetchPetList();
    }
  }, [refreshList]);

  return { loading, setRefreshList };
};

export default usePetLists;
