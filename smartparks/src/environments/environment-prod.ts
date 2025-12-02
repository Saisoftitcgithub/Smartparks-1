// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: true,
    url : window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '') + '/',
    // Backend API URL - use Render backend URL for production
    apiUrl: (() => {
      const hostname = window.location.hostname;
      console.log('Environment: Production');
      console.log('Hostname:', hostname);
      
      // Check if running on Render
      if (hostname.includes('render.com') || hostname.includes('onrender.com')) {
        const apiUrl = 'https://smartparks-backend.onrender.com/api/';
        console.log('Detected Render environment, using:', apiUrl);
        return apiUrl;
      }
      
      // Local development fallback
      if (window.location.protocol === 'https:') {
        const apiUrl = window.location.protocol + '//' + hostname + '/api/';
        console.log('Using HTTPS local:', apiUrl);
        return apiUrl;
      } else {
        const apiUrl = window.location.protocol + '//' + hostname + ':5680/api/';
        console.log('Using HTTP local:', apiUrl);
        return apiUrl;
      }
    })()
  };
  
  console.log('=== Environment Configuration ===');
  console.log('Production:', environment.production);
  console.log('API URL:', environment.apiUrl);
  console.log('Full URL:', window.location.href);

  // apiUrl: 'http://localhost:8086/api/'
  
  /*
   * For easier debugging in development mode, you can import the following file
   * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
   *
   * This import should be commented out in production mode because it will have a negative impact
   * on performance if an error is thrown.
   */
  // import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
  