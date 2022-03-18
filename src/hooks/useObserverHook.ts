import { useEffect } from 'react';

let observer: any;
export default function useObserverHook(ele, callback, watch = []) {
  useEffect(() => {
    const node = document.querySelector(ele);
    if (node) {
      observer = new IntersectionObserver((entries) => {
        callback && callback(entries);
      });
      observer.observe(node);
    }

    return () => {
      if (observer && node) {
        // 解绑
        observer.unobserve(document.querySelector(ele));

        // 停止监听
        observer.disconnect();
      }
    };
  }, watch);
}
