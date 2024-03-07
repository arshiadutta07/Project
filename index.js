const express = require("express");
const app = express();
const port = 4000;
require('./DB/database-connection');
const routes = require('./Routes/api-collection');

//Parsing SON Data
app.use(express.json());
app.use('/api', routes);


const server = app.listen(port, function() {
    try {
        console.log(`Server started successfully on port ${port}`);
    } 
    catch(error) {
        console.log(error);
    }
})
process.on('SIGINT', () => {
    console.log('Server is shutting down...');
    server.close(() => {
      console.log('Server has been shut down.');
      process.exit(0);
    });
});