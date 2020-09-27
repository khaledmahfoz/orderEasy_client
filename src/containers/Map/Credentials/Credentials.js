let H, platform, defaultLayers

if (H) {
   H = window.H

   platform = new H.service.Platform({
      'apikey': process.env.REACT_APP_API_KEY,
      'appid': process.env.REACT_APP_APP_ID
   });

   defaultLayers = platform.createDefaultLayers();
}


export {
   H,
   platform,
   defaultLayers
}
