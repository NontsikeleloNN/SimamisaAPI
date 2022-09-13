module.exports = (sequelize,DataTypes)  => {
    const SponsorshipPost = sequelize.define("sponsorshipPost",{
        
        ID:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement:true

        },
        PostDate:{
            type: DataTypes.DATEONLY,

        },
        Title:{
            type: DataTypes.STRING,
            allowNull:false
        },
        Description:{
            type: DataTypes.STRING,
            allowNull:false
        },

        PostImage:{
            type: DataTypes.STRING,
            allowNull: true
        },
    },
    {
      timestamps:false
  
  });
  
  return SponsorshipPost
  }
  
