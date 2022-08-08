module.exports = (sequelize, DataTypes) => {


const VolunteerSkill = sequelize.define("volunteerSkill", {
    ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    SkillName:{
        type: DataTypes.STRING,
        allowNull: false
    },
    ValidationDoc:{
        type: DataTypes.BLOB
    },
    SkillDescription:{
        type: DataTypes.STRING,
        
    },
},
{ //s freezeTableName: true,
  timestamps:false

});

return VolunteerSkill
}
