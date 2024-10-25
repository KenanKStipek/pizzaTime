import app from './controllers/orders'

app.listen(3000, () => console.log("Server ready on port 3000."));
module.exports = app;
