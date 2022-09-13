module.exports = (sequelize, DataTypes) => {

    const generalDonation = sequelize.define("generalDonation", {
         ID: {
             type: DataTypes.INTEGER,
             allowNull: false,
             primaryKey: true,
             autoIncrement: true
         },

        UserID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        

        ChilID: {
            type: DataTypes.INTEGER,
            allowNull: true
        },

        OrphID: {
            type: DataTypes.INTEGER,
            allowNull: true
        },

        Type: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    { //s freezeTableName: true,
      timestamps:false
  
  });
  

    return generalDonation
}