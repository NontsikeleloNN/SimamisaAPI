module.exports = (sequelize, DataTypes) => {

    const SponsorRequest = sequelize.define("sponsorRequest", {
         ID: {
             type: DataTypes.INTEGER,
             allowNull: false,
             primaryKey: true,
             autoIncrement: true
         },
         RequestDate:{
            type: DataTypes.DATE,
            allowNull: false
         },

         isAccepted:{
            type: DataTypes.BOOLEAN,
            allowNull: false
         },
         isRejected:{
            type: DataTypes.BOOLEAN,
            allowNull: false
         },
      
        },
        { //s freezeTableName: true,
          timestamps:false
      
      });
      
      return SponsorRequest
      }