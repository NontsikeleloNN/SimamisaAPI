module.exports = (sequelize, DataTypes) => {

    const Meeting = sequelize.define("meeting", {
         ID: {
             type: DataTypes.INTEGER,
             allowNull: false,
             primaryKey: true,
             autoIncrement: true
         },
         MeetingDate:{
            type: DataTypes.DATE,
            allowNull: false
         },
         MeetingVenue:{
            type: DataTypes.STRING,
            allowNull: false
         },
         MeetingAccepted:{
            type: DataTypes.BOOLEAN,
            allowNull: false
         },
         MeetingComments:{
            type: DataTypes.STRING,
            allowNull: true
         },
      
        },
        { //s freezeTableName: true,
          timestamps:false
      
      });
      
      return Meeting
      }