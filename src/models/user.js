'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      User.belongsTo(models.Role, {
        foreignKey: 'role_code',
        targetKey: 'code',
        as: 'roleData'
      })

      // ? Giải thích:
      // Muốn từ role_code của bảng user mà trỏ tới bảng Role để lấy giá trị
      //* Tham số đầu tiên là bảng muốn lấy : là bảng Role
      //* Đặt foreign key là trường ở bảng user mà muốn trỏ tới bảng role
      // Cái role_code ở User và code ở Role là 2 dữ liệu giống nhau VD: 'R2' nên để là targetKey
      // * as: là muốn khi trả về thì tất cả dữ liệu sẽ nằm trong object có tên roleData
    }
  };
  User.init(
    {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING,
      avata: DataTypes.STRING,
      role_code: DataTypes.STRING,
      refresh_token: DataTypes.STRING,
      // role code là khóa ngoại
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};