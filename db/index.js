import { Sequelize } from "sequelize";

//初始化MySQL連線
export const sequelize = new Sequelize({
    host: "chargecloud-mysql.mysql.database.azure.com",
    database: "chargingcloud",
    dialect: "mysql",
    username: "chargingcloud@chargecloud-mysql",
    password: 'PretsoCC4Eyes',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    logging: console.log,
    ssl: true,
    dialectOptions: {
      ssl: {
        require: true,
      },
      typeCast: function(field, next) {
        if (field.type == "DATETIME" || field.type == "TIMESTAMP")
          return new Date(field.string() + "Z");
        else if (field.type == "DATE") return field.string();
        return next();
      },
    },
    timezone: "+08:00",
  });
  
  //檢查是否連線成功
  sequelize
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");
    })
    .catch((err) => {
      console.error("Unable to connect to the database:", err);
    });