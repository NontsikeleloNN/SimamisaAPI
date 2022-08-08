module.exports = (sequelize, DataTypes) => {

    const Message = sequelize.define("message", {
         ID: {
             type: DataTypes.INTEGER,
             allowNull: false,
             primaryKey: true,
             autoIncrement: true
         },
         DatetimeSent:{
            type: DataTypes.DATE,
            allowNull: false
         },
         MessageContent:{
            type: DataTypes.STRING,
            allowNull: false
         },
         isFlagged:{
            type: DataTypes.CHAR,
            allowNull: false
        },
    },
    { //s freezeTableName: true,
      timestamps:false
  
  });
  
  return Message
  }