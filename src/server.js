const http = require('http');
const router = require('./router')

http.createServer(router).listen(5000, () => {
    console.log(`server is running at port 5000`);
  })