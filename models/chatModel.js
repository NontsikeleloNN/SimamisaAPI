module.exports = (sequelize,DataTypes)  => {
    const Chat = sequelize.define("chat",{
        
        ID:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement:true

        },
        ChatDate:{
            type: DataTypes.DATE,

        }
    },
    { //s freezeTableName: true,
      timestamps:false
  
  });
  
  return Chat
  }
  
