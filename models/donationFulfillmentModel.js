module.exports = (sequelize,DataTypes)  => {
    const DonationFulfillement = sequelize.define("donationFulfillment",{
        
        ID:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement:true

        },
       DonationComment: {
           type: DataTypes.STRING,
           default: 'DONATION'
       },
       isFulfilled:{
        type : DataTypes.BOOLEAN,
        defaultValue: false
       },
       DateGiven: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      
    },
    AmountGiven: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    },
    { //s freezeTableName: true,
      timestamps:false
  
  });
  
  return DonationFulfillement
 }