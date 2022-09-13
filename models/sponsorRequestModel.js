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
         ChildName:{
            type: DataTypes.STRING,
            allowNull: true
         },
      
        },
        { //s freezeTableName: true,
          timestamps:false
      
      });
      
      return SponsorRequest
      }