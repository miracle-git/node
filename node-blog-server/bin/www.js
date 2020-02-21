const http = require('http');
const port = 8000;
const handleServer = require('../app');
const server = http.createServer(handleServer);

server.listen(port, () => {
  console.log(`server is running on ${port}`);
});
