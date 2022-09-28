

module.exports = (sequelize,DataTypes)  => {
    const Child = sequelize.define("child",{
        
        ID:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement:true

        },
       Username: {
           type: DataTypes.STRING,
           allowNull: false,
           unique:true
       },
       Nickname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ChildDescription: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ChildStruggles: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ChildInterest: {
        type: DataTypes.STRING,
        allowNull: false
    },
    DOB: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    Avatar: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isSponsored: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
},
  { //s freezeTableName: true,
    timestamps:false

});

return Child
}
