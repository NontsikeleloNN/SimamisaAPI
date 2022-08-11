module.exports = (sequelize,DataTypes)  => {
    const SponsorshipPost = sequelize.define("sponsorshipPost",{
        
        ID:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement:true

        },
        PostDate:{
            type: DataTypes.DATE,

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
            type: DataTypes.BLOB,
            allowNull: true
        },
    },
    {
      timestamps:false
  
  });
  
  return SponsorshipPost
  }
  
