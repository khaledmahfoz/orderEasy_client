let H, platform, defaultLayers

if (window.H) {
   H = window.H

   platform = new H.service.Platform({
      apikey: "wz6KAB9guU1vEvDGJTCQoqMNWPv1XUco4LBgVz8Vb8I"
   });

   defaultLayers = platform.createDefaultLayers();
   console.log(defaultLayers)
}

export {
   H,
   platform,
   defaultLayers
}