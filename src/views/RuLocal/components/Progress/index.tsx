import React, { useEffect, useState } from 'react';

const Progress = () => {
  const [ProgressSp, setProgressSp] = useState(0)

  const handlScroll = () => {
      const width = ((window.pageYOffset) / (document.body.clientHeight - window.innerHeight)) * window.innerWidth;
      setProgressSp(width)
  };

  useEffect(() => {
    window.addEventListener('scroll', handlScroll, true);
    return () => {
      window.removeEventListener('scroll', handlScroll, true);
    };
  }, []);
  return (
    <div className="w-full fixed top-0 rc-content--fixed-header">
      <div className='relative w-full'>
        <div className='absolute w-full left-0' style={{
          bottom: '-.5rem'
        }}>
        <div className='bg-gray-200 rounded-full h-2 relative'>
            <div className='inline-block h-2 bg-green absolute top-0 left-0'
                style={{
                    width: ProgressSp + 'px'
                }} />
        </div>
        </div>
      </div>
    </div>
  );
};

export default Progress;
