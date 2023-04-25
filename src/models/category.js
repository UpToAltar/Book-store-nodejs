'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Category extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
        // define association here
        }
    };
    Category.init(
        {
        code:DataTypes.STRING,
        value:{
            type: DataTypes.STRING,
            // Khi thực thi lệnh sẽ chạy vào hàm set trước, in hoa chữ đầu lên
            set(value){
                this.setDataValue('value',value.charAt(0).toUpperCase() + value.slice(1));
            }
        }
        
        
        // Category code là khóa ngoại
        },
        {
        sequelize,
        modelName: "Category",
        }
    );
    return Category;
};