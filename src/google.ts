import { writable } from "svelte/store";

export const gisReady = writable(false);
export const gapiReady = writable(false);

export let tokenClient: google.accounts.oauth2.TokenClient = null;

const initGapiClient = async () => {
  await gapi.client.init({
    discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
  });
  gapiReady.set(true);
}

export const onGapiLoaded = () => gapi.load("client", initGapiClient);

export const onGisLoaded = () => {
  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    scope: "https://www.googleapis.com/auth/calendar",
    callback: null
  });
  gisReady.set(true);
}