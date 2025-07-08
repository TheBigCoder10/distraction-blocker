function isBlockedTime() {
  const now = new Date();
  const hour = now.getHours(); 
  return hour >= 8 && hour < 20; 
}

if (isBlockedTime()) {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
console.log(`User's current timezone is ${timezone}`);
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
        <h1>🚫 Blocked Until 8:00 PM</h1>
        <p>Use this time wisely. You’ll be back at 8PM local time.</p>
        <p> Current timezone: ${timezone} </p>
      </div>
    </body>
  `;
}
