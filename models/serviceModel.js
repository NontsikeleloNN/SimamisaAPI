module.exports = (sequelize,DataTypes)  => {
    const Service = sequelize.define("service",{
        
        ID:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement:true

        },
        ServiceName:{
            type: DataTypes.STRING,
            allowNull: false
        },
        ServiceDescription:{
            type: DataTypes.STRING,
            allowNull: false
        },
        VolunteerType:{
            type: DataTypes.STRING,
            default: 'All types'
        },
        Duration:{
            type: DataTypes.DOUBLE
        },
        CutOffDate:{
            type: DataTypes.DATE
        },
    },
    { //s freezeTableName: true,
      timestamps:false
  
  });
  
  return Service
  }