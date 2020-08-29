let H, platform, defaultLayers

if (window.H) {
   H = window.H

   platform = new H.service.Platform({
      'apikey': "EgBsgWq39eAPDruvlkHMeBgFVPErqmbkD4WKlLFaX6g",
      'appid': "sDRXgt2bfClUTKJ7VHD5"
   });

   defaultLayers = platform.createDefaultLayers();
}

export {
   H,
   platform,
   defaultLayers
}