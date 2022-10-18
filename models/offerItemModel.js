module.exports = (sequelize,DataTypes)  => {
    const OfferItem = sequelize.define("offerItem",{
        
        ID:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement:true

        },
        ReceivingPartner: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        AmountTaken: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        isRejected: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue : false 
        },
        isAccepted: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: false
        },
    },
    { //s freezeTableName: true,
      timestamps:false
  
  });
  
  return OfferItem
  }