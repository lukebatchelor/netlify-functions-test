exports.handler = function(event, context, callback) {
  const now = new Date().toString();
  const secret = process.env.secret || "No secret found";
  callback(null, {
    statusCode: 200,
    body: `Hello, World - ${now}\n${secret}`
  });
};
