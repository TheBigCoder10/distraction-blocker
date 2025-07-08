function isBlockedTime() {
  const now = new Date();
  const hourEST = parseInt(new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    hour: 'numeric',
    hour12: false
  }).format(now), 10);
  return !(hourEST >= 20 || hourEST < 8);
}

if (isBlockedTime()) {
  document.documentElement.innerHTML = `
    <style>
      body {
        background-color: black;
        color: white;
        font-family: sans-serif;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        text-align: center;
        padding: 20px;
      }
    </style>
    <body>
      <div>
        <h1>🚫 Blocked Until 8:00 PM EST</h1>
        <p>Use this time wisely. You’ll be back at 8PM.</p>
      </div>
    </body>
  `;
}
