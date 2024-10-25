import "dotenv/config";

import app from './controllers/orders'

if(process.env.ENV === 'dev') {
  app.listen(3000, () => console.log("Server ready on port 3000."));
} else {
  module.exports = app;
}