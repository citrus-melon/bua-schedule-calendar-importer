<script lang="ts">
  import Nav from "../lib/components/Nav.svelte";
</script>

<main>
  <Nav on:back={() => (window.location.hash = "#")} />
  <h1>Privacy Policy</h1>

  <p>
    This Privacy Policy describes how the BUA Schedule → Google Calendar
    Importer (the "Site") collects, uses, and shares your information. It does
    not apply to any third-party services. By using the Site, you agree to the
    collection, use, and sharing of your information as described in this
    Privacy Policy. This Privacy Policy is effective as of March 14, 2023 (the
    date it was last updated).
  </p>

  <h2>Information We Collect</h2>
  <p>
    The Site allows you to provide your personal information. This includes the
    names, times, dates, names of instructors, and locations of courses you are
    enrolled in.
  </p>
  <p>
    The Site accesses information from third parties such as the list of
    calendars you have access to add events to in Google Calendar.
  </p>
  <p>
    The Site is hosted using GitHub Pages, a third-party service which may
    collect log data (such as your IP address) and other information in
    accordance with <a
      href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement"
      >Github's Privacy Statement</a
    >. We are not responsible for any information collected by GitHub.
  </p>

  <h2>How We Use Your Information</h2>
  <p>
    We use your information only to provide the Site and its services. We do not
    store or retain any personal information persistently. All data processing
    is done on the user's device.
  </p>

  <h2>Sharing of Information</h2>
  <p>
    The Site uses the Google Calendar API to add events to your Google Calendar
    based on information you provide. Google may use this data in accordance
    with <a href="https://policies.google.com/privacy"
      >Google's Privacy Policy</a
    >.
  </p>

  <h2>Your Rights</h2>
  <p>
    You have the right to access, rectify, erase, or object to the processing of
    your personal information at any time.
  </p>

  <h2>Changes to Our Privacy Policy</h2>
  <p>
    We may change this Privacy Policy at any time. We encourage you to check
    this page frequently to view the latest version of our Privacy Policy.
  </p>

  <h2>Contact Us</h2>
  <p>
    If you have any questions about this Privacy Policy, please contact <a
      href="mailto:contact@citrusmelon.dev">contact@citrusmelon.dev</a
    >.
  </p>
</main>

<style>
  main {
    margin: auto;
    max-width: 60em;
  }
</style>
