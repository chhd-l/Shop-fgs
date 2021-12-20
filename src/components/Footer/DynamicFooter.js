import React, { useEffect } from 'react';
import { menubarJSON } from './menubar';

const DynamicFooter = () => {
  useEffect(() => {
    window.addEventListener('click', (e) => {
      let currentTargetDom = e.target;
      if (!currentTargetDom.classList.contains('J_rc-list__header')) {
        currentTargetDom = e.target.closest('.J_rc-list__header');
      }
      if (!currentTargetDom) {
        return false;
      }

      // 需要打开时，指定父级rc-list下的，所有子节点rc-list，全部关闭;同级的指定兄弟节点,打开
      // 需要关闭时，同级的指定兄弟节点，关闭
      const needToOpen = !currentTargetDom.classList.contains(
        'rc-list__header-open'
      );
      currentTargetDom
        .closest('ul.rc-list')
        .querySelectorAll('.rc-list__item--group')
        .forEach((el) => {
          el.querySelector('.J_rc-list__header').classList.remove(
            'rc-list__header-open'
          );
        });

      if (needToOpen) {
        currentTargetDom.classList.add('rc-list__header-open');
      } else {
        currentTargetDom.classList.remove('rc-list__header-open');
      }
    });
    return () => {};
  }, []);

  return (
    <nav
      data-toggle-group="mobile"
      data-toggle-effect="rc-expand--vertical"
      className="rc-padding-x--xs--desktop rc-padding-x--none--mobile"
      dangerouslySetInnerHTML={{
        __html: menubarJSON[window.__.env.REACT_APP_COUNTRY]
      }}
    />
  );
};

export default DynamicFooter;
