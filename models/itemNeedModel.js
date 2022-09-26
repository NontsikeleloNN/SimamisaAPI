

module.exports = (sequelize,DataTypes)  => {
    const ItemNeed = sequelize.define("itemNeed",{
        
        ID:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement:true

        },
        DateEstablished:{
            type: DataTypes.DATEONLY,
            allowNull: true
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
            allowNull: false,
            defaultValue:false
        },
        PriorityRating:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        ItemImage:{
            type: DataTypes.STRING,
            allowNull: true
        },
        NumberReceived:{
            type: DataTypes.INTEGER,
            allowNull: false,
            //defaultValue : calcItemsReceived(ID)
        },
        NumberNeeded:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        AmountNeeded:{
            type : DataTypes.DOUBLE,

        },
        AmountReceived:{
            type : DataTypes.DOUBLE
        },
        UnitCost:{
            type: DataTypes.DOUBLE,
            allowNull: true
        },
    },
    {
      timestamps:false
  
  });
  
  return ItemNeed
  }
  
