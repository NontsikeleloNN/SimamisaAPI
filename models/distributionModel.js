module.exports = (sequelize, DataTypes) => {

    const generalDonation = sequelize.define("distribution", {
         ID: {
             type: DataTypes.INTEGER,
             allowNull: false,
             primaryKey: true,
             autoIncrement: true
         },

        Amount: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    { //s freezeTableName: true,
      timestamps:false
  
  });
  

    return generalDonation
}