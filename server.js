const express = require('express');
const sequelize = require('./config/connection');
const routes = require('./controllers');

const PORT = process.env.PORT || 3001;
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

sequelize.sync({ force: true }).then(() => {
    app.listen(PORT, () => console.log(`App now listening on port ${PORT}`));
});
