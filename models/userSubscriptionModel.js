module.exports = (sequelize, DataTypes) => {

    const UserSubscription = sequelize.define("userSubscription", {
        
        ID:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement:true

        },
        Status:{
            type: DataTypes.STRING,
            allowNull: false
        },
        SubscriptionDate:{
            type: DataTypes.DATEONLY,
            allowNull: false
        },

    },
    { //s freezeTableName: true,
      timestamps:false
  
  });
  
  return UserSubscription
  }
  