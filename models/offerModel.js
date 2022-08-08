module.exports = (sequelize,DataTypes)  => {
    const Offer = sequelize.define("offer",{
        
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
       Description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    DateMade: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },

    isAvailable: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    Quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    },
    { //s freezeTableName: true,
      timestamps:false
  
  });
  
  return Offer
  }