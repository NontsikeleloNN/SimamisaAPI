module.exports = (sequelize,DataTypes)  => {
    const SponsorFile = sequelize.define("sponsorFile",{
        
        ID:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement:true

        },
        DocumentName:{
            type: DataTypes.STRING,
            allowNull: false,
           
        },
        DocumentFile:{
            type: DataTypes.BLOB,
            allowNull: false,
           

        },
    },
    { //s freezeTableName: true,
      timestamps:false
  
  });
  
  return SponsorFile
  }