exports.handler = function(event, context, callback) {
  const now = new Date().toString();
  callback(null, {
    statusCode: 200,
    body: `Hello, World - ${now}`
  });
};
