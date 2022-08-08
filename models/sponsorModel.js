module.exports = (sequelize,DataTypes)  => {
    const Sponsor = sequelize.define("sponsor",{
        
        ID:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement:true

        },
       Profession: {
           type: DataTypes.STRING,
           allowNull: false
       },
    },
    { //s freezeTableName: true,
      timestamps:false
  
  });
  
  return Sponsor
  }