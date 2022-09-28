module.exports = (sequelize,DataTypes)  => {
    const Sponsorship = sequelize.define("sponsorship",{
        
        ID:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement:true

        },
        DateStarted:{
            type: DataTypes.DATEONLY,
            allowNull: false
        },
       
        isActive:{
            type: DataTypes.CHAR,
            default: '0',
            allowNull: false
        }
    },
    { //s freezeTableName: true,
      timestamps:false
  
  });
  
  return Sponsorship
  }
  