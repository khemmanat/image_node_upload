const Sequelize = require("sequelize");

// Option 1: Passing parameters separately
const sequelize = new Sequelize("qscan_upload", "root", "", {
    host: "localhost",
    dialect: "mysql" /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
});

sequelize
    .authenticate()
    .then(() => {
        console.log("Connection has been established successfully.");
    })
    .catch((err) => {
        console.error("Unable to connect to the database:", err);
    });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.upload = require("./upload")(sequelize, Sequelize);

module.exports = db;
