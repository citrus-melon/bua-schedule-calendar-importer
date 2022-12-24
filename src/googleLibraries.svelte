<svelte:head>
  <script src="https://apis.google.com/js/api.js" on:load={onGapiLoaded}></script>
  <script src="https://accounts.google.com/gsi/client" on:load={onGisLoaded}></script>
</svelte:head>

<script context="module" lang="ts">
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
  
  const onGapiLoaded = () => gapi.load("client", initGapiClient);
  
  const onGisLoaded = () => {
    tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      scope: "https://www.googleapis.com/auth/calendar",
      callback: null
    });
    gisReady.set(true);
  }
</script>