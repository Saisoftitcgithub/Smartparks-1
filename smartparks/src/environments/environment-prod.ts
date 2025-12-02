// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: true,
    url : window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '') + '/',
    // For Render deployment - use backend service URL
    // Update this with your actual Render backend URL after deployment
    apiUrl: (window.location.hostname.includes('render.com') || window.location.hostname.includes('onrender.com'))
      ? 'https://smartparks-backend.onrender.com/api'
      : window.location.protocol + '//' + window.location.hostname + '/api'
  };
  
  // Fallback for local development
  if (!environment.apiUrl || environment.apiUrl.includes('localhost')) {
    if (window.location.protocol === 'https:') {
      environment.apiUrl = window.location.protocol + '//' + window.location.hostname + '/api';
    } else {
      environment.apiUrl = window.location.protocol + '//' + window.location.hostname + ':5680/api/';
    }
  }
  
  console.log('API URL:', environment.apiUrl);

  // apiUrl: 'http://localhost:8086/api/'
  
  /*
   * For easier debugging in development mode, you can import the following file
   * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
   *
   * This import should be commented out in production mode because it will have a negative impact
   * on performance if an error is thrown.
   */
  // import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
  