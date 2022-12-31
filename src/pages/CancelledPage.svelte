<script>
  import MessagePage from "../components/MessagePage.svelte";
  import { currentPage } from "../stores";
  import UploadPage from "./UploadPage.svelte";
</script>

<MessagePage title="Cancelled" on:back={() => $currentPage = UploadPage}>
  <p>You can manually remove any added events in Google Calendar.</p>
</MessagePage>