// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: true,
    url : window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '') + '/',
    // Backend API URL - HARDCODED for Render deployment
    // This ensures the correct URL is always used in production
    apiUrl: 'https://smartparks-backend.onrender.com/api/'
  };
  
  // Extensive logging for debugging
  console.log('=== PRODUCTION Environment Configuration ===');
  console.log('Production mode:', environment.production);
  console.log('API URL:', environment.apiUrl);
  console.log('Current hostname:', window.location.hostname);
  console.log('Current protocol:', window.location.protocol);
  console.log('Full URL:', window.location.href);
  console.log('Login endpoint will be:', environment.apiUrl + 'login');

  // apiUrl: 'http://localhost:8086/api/'
  
  /*
   * For easier debugging in development mode, you can import the following file
   * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
   *
   * This import should be commented out in production mode because it will have a negative impact
   * on performance if an error is thrown.
   */
  // import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
  