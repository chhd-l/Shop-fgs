import { useState, useEffect } from 'react';

const useAxios = (doApi) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(async () => {
    try {
      const res = await doApi();
      setData(res.context);
      setIsPending(false);
    } catch (err) {
      setIsPending(false);
      setError(err.message);
    }
    // setTimeout(() => {
    //     fetch(url,{signal: abortCont.signal})
    //         .then(res => {
    //             if (!res.ok) {
    //                 throw Error('could not fetch the data for that resource')
    //             }
    //             return res.json();
    //         }).then(data => {
    //             setData(data)
    //             setIsPending(false)
    //         })
    //         .catch(err => {
    //             setIsPending(false)
    //             setError(err.message)
    //         })
    // }, 1000)
  }, [doApi]);

  return new Promise((resolve) => resolve({ data, isPending, error }));
};

export default useAxios;
