module.exports = (sequelize, DataTypes) => {

    const Volunteer = sequelize.define("volunteer", {
         ID: {
             type: DataTypes.INTEGER,
             allowNull: false,
             primaryKey: true,
             autoIncrement: true
         },
         Profession:{
            type: DataTypes.STRING
         },
         TotalTimeServed:{
            type: DataTypes.DOUBLE,
         },
        },
        { //s freezeTableName: true,
          timestamps:false
      
      });
      
      return Volunteer
      }
      