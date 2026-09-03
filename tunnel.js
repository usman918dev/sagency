const localtunnel = require('localtunnel');
const fs = require('fs');

(async () => {
  try {
    console.log("Starting localtunnel on port 3000...");
    const tunnel = await localtunnel({ port: 3000 });
    console.log("Public URL: " + tunnel.url);
    fs.writeFileSync('lt_url.txt', tunnel.url);
    console.log("URL written to lt_url.txt successfully.");
  } catch (err) {
    console.error("Error starting localtunnel:", err);
    fs.writeFileSync('lt_url.txt', "ERROR: " + err.message);
  }
})();
