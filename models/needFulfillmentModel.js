module.exports = (sequelize,DataTypes)  => {
    const NeedFulfillement = sequelize.define("needFulfillment",{
        
        ID:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement:true

        },  
       NeedComment: {
           type: DataTypes.STRING,
           defaultValue: 'FULFILLED'
         },
       DateGiven: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    NumberGiven: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    },
    { //s freezeTableName: true,
      timestamps:false
  
  });
  
  return NeedFulfillement
  }