module.exports = (sequelize,DataTypes)  => {
    const ServiceVolunteer = sequelize.define("serviceVolunteer",{
        
        ID:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement:true

        },
       TimeServed: {
           type: DataTypes.DECIMAL,
           allowNull: false
       },
       Comment: {
        type: DataTypes.STRING,
        allowNull: false
    },
    DateServed: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },

    },
    { //s freezeTableName: true,
      timestamps:false
  
  });
  
  return ServiceVolunteer
  }