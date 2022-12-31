<script>
  import MessagePage from "../components/MessagePage.svelte";
  import { calendar, currentPage } from "../stores";
  import UploadPage from "./UploadPage.svelte";
</script>

<MessagePage title="All Done!" buttonLabel="Home" on:back={() => $currentPage = UploadPage}>
  <p>Your classes were added to calendar <strong>{$calendar.summary}</strong>.</p>
</MessagePage>