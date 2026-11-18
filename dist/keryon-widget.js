// Keryon chat widget, for the site owner's own browser only.
// Visit the site once with ?keryon-widget=on to turn it on in this browser, ?keryon-widget=off to
// turn it off. Everyone else loads nothing. The widget and its API run on the owner's own machine
// (Keryon on localhost), so no one else could reach them anyway.
(function () {
  var FLAG_KEY = "keryon-widget";
  var WIDGET_URL = "http://localhost:4173/widget.js";
  var API_URL = "http://localhost:8000";
  var PUBLICATION_ID = "6afde3e9c9e654cc5c97a1be";

  function readSwitch() {
    return new URLSearchParams(window.location.search).get(FLAG_KEY);
  }

  function isEnabled() {
    try {
      var requested = readSwitch();
      if (requested === "on") localStorage.setItem(FLAG_KEY, "on");
      if (requested === "off") localStorage.removeItem(FLAG_KEY);
      return localStorage.getItem(FLAG_KEY) === "on";
    } catch (error) {
      return false;
    }
  }

  if (!isEnabled()) return;
  var script = document.createElement("script");
  script.src = WIDGET_URL;
  script.async = true;
  script.dataset.keryonPublicationId = PUBLICATION_ID;
  script.dataset.keryonApiUrl = API_URL;
  document.body.appendChild(script);
})();
