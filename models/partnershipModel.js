

module.exports = (sequelize,DataTypes)  => {
    const Partnership = sequelize.define("partnership",{
        ID:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement:true

        },
       
        PartnershipDate:{
            type: DataTypes.DATEONLY,
            allowNull:false
        },
        isActive:{
            type: DataTypes.CHAR,
            allowNull:false
        }
    },
    { //s freezeTableName: true,
      timestamps:false
  
  });
  
  return Partnership
  }
  