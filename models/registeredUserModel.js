//need to save this and commit changes 
module.exports = (sequelize,DataTypes)  => {
    const RegisteredUser = sequelize.define("registeredUser",{
        
        ID:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement:true

        },
        FirstName:{
            type: DataTypes.STRING,
            allowNull: false
        }, 
        Surname:{
            type: DataTypes.STRING,
            allowNull: false
        },
        Email:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        Phonenumber:{
            type: DataTypes.STRING,
            allowNull: true
        }, 
        Status:{
            type: DataTypes.STRING,
            allowNull: true
        },
        isFlagged:{
            type: DataTypes.CHAR,
            allowNull: false,
            default: 'false'
        },
        isVolunteer:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        isSponsor:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        isDonor:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        UserPassword:{
            type: DataTypes.STRING,
            allowNull: false
        }, 
        UserRole:{
            type: DataTypes.STRING,
            allowNull: false
        }, 
        
        UserAddress:{
            type: DataTypes.STRING,
            allowNull: false
        }

    },
    { //s freezeTableName: true,
      timestamps:false
  
  });
  
  return RegisteredUser
  }
  