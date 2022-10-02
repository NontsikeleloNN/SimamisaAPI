module.exports = (sequelize,DataTypes)  => {
    const ChildNeed = sequelize.define("childNeed",{
        
        ID:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement:true

        },
    
        Title:{
            type: DataTypes.STRING,
            allowNull:false
        },
        Description:{
            type: DataTypes.STRING,
            allowNull:false
        },
        isFulfilled:{
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        AmountReceived:{
            type: DataTypes.DOUBLE,
        },
        AmountNeeded:{
            type: DataTypes.DOUBLE 
        },
           DueDate: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
    },
    { //s freezeTableName: true,
      timestamps:false
  
  });
  
  return ChildNeed
  }
  
