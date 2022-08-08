
module.exports = (sequelize, DataTypes) => {

    const Event = sequelize.define("event", {
         ID: {
             type: DataTypes.INTEGER,
             allowNull: false,
             primaryKey: true,
             autoIncrement: true
         },

        EventName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        

        EventDescription: {
            type: DataTypes.STRING,
            allowNull: false
        },

        EventPoster: {
            type: DataTypes.BLOB('long'),
            allowNull: false
        },

        EventDate: {
            type: DataTypes.DATE,
            allowNull: false
        }
    },
    { //s freezeTableName: true,
      timestamps:false
  
  });
  

    return Event
}