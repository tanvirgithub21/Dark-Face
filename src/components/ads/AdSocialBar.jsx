// components/AdScript.js
"use client"
import { useEffect } from 'react';

const AdSocialBar = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//pl25743361.profitablecpmrate.com/9c/29/b0/9c29b0dbac89b1787bd1a215235b9786.js';
    script.type = 'text/javascript';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
};

export default AdSocialBar;
