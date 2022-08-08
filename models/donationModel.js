module.exports = (sequelize,DataTypes)  => {
    const Donation = sequelize.define("donation",{
        
        ID:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement:true

        },
        DueDate:{
            type: DataTypes.DATEONLY,

        },
        DateEstablished:{
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        Title:{
            type: DataTypes.STRING,
            allowNull:false
        },
        Description:{
            type: DataTypes.STRING,
            allowNull:false
        },
        isFufilled:{
            type: DataTypes.BOOLEAN,
            allowNulll: false
        },
        PriorityRating:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        ItemImage:{
            type: DataTypes.BLOB,
            allowNull: true
        },
        isFullfilled:{
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        AmountReceived:{
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        AmountNeeded:{
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        DonationType:{
            type: DataTypes.STRING,
            allowNull: true //enum on front-end
        },

    },
    { //s freezeTableName: true,
      timestamps:false
  
  });
  
  return Donation
  }
  
