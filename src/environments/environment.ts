// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false, 
 //prod
  // Admin_URL:`http://payrowdev.uaenorth.cloudapp.azure.com/adminbackend`,
  // srvCatalalogue_URL:`http://payrowdev.uaenorth.cloudapp.azure.com/services`,
  // Onboarding_URL:`http://payrowdev.uaenorth.cloudapp.azure.com/merchant`,
  // Mobile_URL:`http://payrowdev.uaenorth.cloudapp.azure.com/invoice`,
  // gateway_URL:"https://payrowdev.uaenorth.cloudapp.azure.com/gateway"
  //local
  Mobile_URL: 'http://localhost:3030/invoice',
  Admin_URL: 'http://localhost:3031/adminbackend',
  // Onboarding_URL: "http://localhost:3032/merchant",
  srvCatalalogue_URL: `http://localhost:3025/services`,
  gateway_URL: "http://localhost:3033/gateway",
  Onboarding_URL: "http://localhost:3032/merchant",
  iv:"gaOr3uvhZEwFeSbRHwlHcg==",

};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
