module.exports = (sequelize,DataTypes)  => {
    const Notify = sequelize.define("notify",{
        
        ID:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement:true

        },
        Title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Body: {
            type: DataTypes.STRING,
            allowNull: false
        },
        NotificationTime:{ 
            type: DataTypes.DATE,
            allowNull: false 
        },
        Read:{ 
            type: DataTypes.BOOLEAN,
            defaultValue: false 
        }
    },
    { //s freezeTableName: true,
      timestamps:false
  
  });
  
  return Notify
  }