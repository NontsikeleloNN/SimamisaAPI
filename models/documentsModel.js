module.exports = (sequelize,DataTypes)  => {
    const Document = sequelize.define("document",{
        
        ID:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement:true

        },
        DocUrl:{
            type: DataTypes.STRING,

        }
    },
    { //s freezeTableName: true,
      timestamps:false
  
  });
  
  return Document
  }
  
