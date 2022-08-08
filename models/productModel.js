module.exports = (sequelize,DataTypes)  => {
    const Product = sequelize.define("product",{
        
        ID:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement:true

        },
       ProductName: {
           type: DataTypes.STRING,
           allowNull: false
       },
       ProductDescription: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ProductCondition: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ProductPrice: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    ProductImage: {
        type: DataTypes.BLOB,
        allowNull: false
    },
    isAvailable: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    },
    { //s freezeTableName: true,
      timestamps:false
  
  });
  
  return Product
  }