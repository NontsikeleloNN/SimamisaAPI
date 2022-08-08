module.exports = (sequelize,DataTypes)  => {
    const OrphanageManager = sequelize.define("orphanageManager",{
        
        ID:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement:true

        },
    },
    { //s freezeTableName: true,
      timestamps:false
  
  });
  
  return OrphanageManager
  }