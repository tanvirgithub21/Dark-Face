import Script from 'next/script';

const AdComponent = () => {
  return (
    <div className=''>
      {/* Add the script for the advertisement */}
      <Script 
        strategy="afterInteractive"
        type="text/javascript"
      >
        {`
          atOptions = {
            'key' : '843552e92a2ecbaaf106eb13fde6c909',
            'format' : 'iframe',
            'height' : 60,
            'width' : 468,
            'params' : {}
          };
        `}
      </Script>

      {/* Add the script source to invoke the ad */}
      <Script 
        strategy="afterInteractive"
        src="//www.highperformanceformat.com/843552e92a2ecbaaf106eb13fde6c909/invoke.js" 
      />

      {/* Optionally, display the ad container */}
      <div id="ad-container">
        {/* The iframe or ad will be injected here by the above scripts */}
      </div>
    </div>
  );
};

export default AdComponent;
