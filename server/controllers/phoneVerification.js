const https = require('https');
// URL of the JSON file
const user_json_url = "URL_OF_YOUR_JSON_FILE";

https.get(user_json_url, (res) => {
  let data = '';

  // A chunk of data has been received.
  res.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received.
  res.on('end', () => {
    const jsonData = JSON.parse(data);

    // Access user_email_id
    const user_email_id = jsonData.user_email_id;

    console.log("User Email id:", user_email_id);
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});