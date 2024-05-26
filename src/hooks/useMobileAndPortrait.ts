import { useState, useEffect } from 'react';

function useMobileAndPortrait() {
  const [isMobile, setIsMobile] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);

  useEffect(() => {

    const checkIfMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor;
      if (/android/i.test(userAgent)) {
        return true;
      }
      if (/iPad|iPhone|iPod/.test(userAgent)) {
        return true;
      }
      return false;
    };


    const checkOrientation = () => {
      return window.matchMedia("(orientation: portrait)").matches;
    };


    setIsMobile(checkIfMobile());
    setIsPortrait(checkOrientation());

    const handleOrientationChange = () => {
      setIsPortrait(checkOrientation());
    };

    window.addEventListener('resize', handleOrientationChange);

    return () => {
      window.removeEventListener('resize', handleOrientationChange);
    };
  }, []);

  return { isMobile, isPortrait };
}

export default useMobileAndPortrait;