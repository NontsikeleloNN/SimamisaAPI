module.exports = (sequelize,DataTypes)  => {
    const Store = sequelize.define("store",{
        
        ID:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement:true

        },
       StoreName: {
           type: DataTypes.STRING,
           allowNull: false
       },
       StoreLink: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Active: {
        type: DataTypes.CHAR,
        allowNull: false
    
    },
},
    { //s freezeTableName: true,
      timestamps:false
  
  });
  
  return Store
  }