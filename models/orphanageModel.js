

module.exports = (sequelize, DataTypes) => {
    const Orphanage = sequelize.define("orphanage",{
        

         ID:{
             type: DataTypes.INTEGER,
             allowNull: false,
             primaryKey: true,
             autoIncrement:true

         },
        OrphanageName: {
            type: DataTypes.STRING,
            allowNull: false
        },

        OrphanageAddress: {
            type: DataTypes.STRING,
            allowNull: false
        },

        OrphanageImage: {
            type: DataTypes.STRING,
            allowNull: false
        },

        OrphanageDescription: {
            type: DataTypes.STRING,
            allowNull: false
        },

        DateReg: {
            type: DataTypes.STRING, //this might be cause of an error because I have no clue what date is in js
            allowNull: false
        },

        Children: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        DefaultChildPassword: {
            type: DataTypes.STRING,
            allowNull: false
           
        }
    },
    { //s freezeTableName: true,
      timestamps:false
  
  });
  
  return Orphanage
  }
  