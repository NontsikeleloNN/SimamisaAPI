module.exports = (sequelize,DataTypes)  => {
    const ItemProposal = sequelize.define("itemProposal",{
        ID:{
            type : DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true,
            allowNull: false
        },
        PickUpTime:{
            type: DataTypes.DATE
        },
        PickUpPlace:{
            type: DataTypes.STRING
        },
        DropOffTime:{
            type: DataTypes.DATE
        },
        NumberToGive:{
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        ProposalComment:{
            type: DataTypes.STRING,
            
        },
        ProposalType:{
            type : DataTypes.STRING,
            allowNull: false
        },
        AmountGiven:{
            type : DataTypes.DOUBLE,
            defaultValue : 0.0
        },
       isFulfilled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
       },
       isAccepted:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
       },
       Coordinates:{
        type: DataTypes.STRING,
        allowNull: true,
       
       },
        Distance:{
        type: DataTypes.DOUBLE,
        allowNull: true,
       
       },
    },
    { //s freezeTableName: true,
      timestamps:false
  
  });
  
  return ItemProposal
  }