exports.handler = function(event, context, callback) {
  const fetch = require("node-fetch").default;
  const token = process.env.token;
  const repo = process.env.repo;
  const data_path = process.env.data_path;
  const secret = process.env.secret || "No secret found";
  const now = new Date().toString();
  console.log(JSON.stringify(event, null, 2));
  const [, requestedShortUrl] = event.path.match(/get\/(.+?)$/);
  if (!requestedShortUrl) {
    return callback(null, {
      statusCode: 400,
      body: `Invalid request`
    });
  }
  console.log("looking for ", requestedShortUrl);
  const api = `https://api.github.com/repos/${repo}/contents/${data_path}`;
  const headers = { Authorization: `token ${token}` };
  fetch(api, { headers })
    .then(r => r.json())
    .then(data => {
      const encodedContent = data.content;
      const content = Buffer.from(encodedContent, "base64");
      const jsonData = JSON.parse(content);
      console.log(jsonData);
      if (jsonData[requestedShortUrl]) {
        console.log("found", context);
        return callback(null, {
          statusCode: 200,
          body: `Hello, World - ${now}\n${secret}\n${JSON.stringify(
            data,
            null,
            2
          )}`
        });
      }
      callback(null, {
        statusCode: 404,
        body: `Unable to find url for ${requestedShortUrl}`
      });
    });
};

/*

WwogIHsgImZvbyI6IHsgInVybCI6ICJodHRwczovL2dvb2dsZS5jb20iIH0gfSwKICB7ICJiYXIiOiB7ICJ1cmwiOiAiaHR0cHM6Ly9hdGxhc3NpYW4uY29tICIgfSB9Cl0K

85df4c8891f3efd6acfc88507af67642b549fa0a

{"message": "updating data", "content":"WwogIHsgImZvbyI6IHsgInVybCI6ICJodHRwczovL2dvb2dsZS5jb20iIH0gfSwKICB7ICJiYXIiOiB7ICJ1cmwiOiAiaHR0cHM6Ly9hdGxhc3NpYW4uY29tICIgfSB9Cl0K", "sha": "85df4c8891f3efd6acfc88507af67642b549fa0a",  }
*/
