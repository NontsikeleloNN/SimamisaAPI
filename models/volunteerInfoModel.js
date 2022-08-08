module.exports = (sequelize, DataTypes) => {

    const VolunteerInfo = sequelize.define("volunteerInfo", {
        
        ID:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement:true

        }, 
        ArrivalTime:{
            type: DataTypes.DATE,
            allowNull: false
        },
        DepartureTime:{
            type: DataTypes.DATE,
            allowNull: false
        },
        
    },
    { //s freezeTableName: true,
      timestamps:false
  
  });
  
  return VolunteerInfo
  }