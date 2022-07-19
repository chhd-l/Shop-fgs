import React, { useEffect, useState } from 'react';

let startTop = 0;

const Progress = () => {
  const [ProgressSp, setProgressSp] = useState('0%')

  const handlScroll = () => {
    const windowTop =
      document.querySelector('#footer')?.getBoundingClientRect().top || 0;
    // 消除误差
    const top = Number(((windowTop - 50) / startTop)) * 100;
    console.log('top', top);
    setProgressSp(() => {
        if(top > 100) return '0%'
        else if (top < 0) return '100%'
        else return 100 - top + '%'
    })
  };

  useEffect(() => {
    window.addEventListener('scroll', handlScroll, true);
    const windowTop =  document.querySelector('html')?.getBoundingClientRect().height || 0;
    // console.log('aa',aa)
    // const windowTop =
    //   document.querySelector('#footer')?.getBoundingClientRect().top || 0;
    // console.log('windowTop', windowTop);
    // 消除误差
    startTop = windowTop - 200 ;
    return () => {
      window.removeEventListener('scroll', handlScroll, true);
      startTop = 0
    };
  }, []);
  return (
    <div className="w-full fixed top-0 rc-content--fixed-header" style={{
        zIndex: '999'
    }}>
        <div className='bg-gray-200 rounded-full h-2 relative -mt-2'>
            <div className='inline-block h-2 bg-green absolute top-0 left-0'
                style={{
                    width: ProgressSp
                }} />
        </div>
    </div>
  );
};

export default Progress;
