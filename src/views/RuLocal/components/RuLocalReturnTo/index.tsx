import React, { useEffect, useState } from 'react';

const RuLocalReturnTo = ({start, end}: {
    start: number
    end: number
}) => {
    const [ToOpen, setToOpen] = useState(false)

    const handlScroll = () => {
      const windowTop =
        document.querySelector('#ListOfDocuments')?.getBoundingClientRect().top || 0;
        if(windowTop <= start && windowTop >= end) setToOpen(true)
        else setToOpen(false)
    };
  
    useEffect(() => {
      window.addEventListener('scroll', handlScroll, true);
      return () => {
        window.removeEventListener('scroll', handlScroll, true);
      };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <div className={`${ToOpen ? 'md:fixed top-3/4' : 'md:absolute bottom-16'} md:bg-transparent md:p-0 py-10 px-2.5 bg-cs-gray-150 right-32`}>
    <div className="flex flex-col items-center">
      <span className="w-14 h-14"
          style={{
              background: `url(${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/ru-local/pdf/up-icon.png) no-repeat center`,
              backgroundSize: '100% 100%'
          }}
          onClick={() => {
              let anchorElement = document.getElementById('ReturnTo')
              if (anchorElement) {
                anchorElement.scrollIntoView({ inline: 'start', block: 'start', behavior: 'auto' })
              }
          }}
      />
      <p className='mt-1.5'>Вернуться к началу</p>
    </div>
  </div>
}

export default RuLocalReturnTo