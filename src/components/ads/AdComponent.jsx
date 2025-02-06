import { useEffect } from 'react';

const AdComponent = () => {
  useEffect(() => {
    // স্ক্রিপ্টটি ডাইনামিকভাবে অ্যাড করা
    const script = document.createElement('script');
    script.src = "//pl25789474.profitablecpmrate.com/0f920d0e4bb959d69287a5d18ce05324/invoke.js";
    script.async = true;
    script.setAttribute('data-cfasync', 'false');

    // স্ক্রিপ্টটিকে বডিতে অ্যাপেন্ড করা
    document.body.appendChild(script);

    return () => {
      // কম্পোনেন্ট আনমাউন্ট হলে স্ক্রিপ্টটি রিমুভ করা
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div id="container-0f920d0e4bb959d69287a5d18ce05324">
      {/* অ্যাডটি এখানে শো হবে */}
    </div>
  );
};

export default AdComponent;
