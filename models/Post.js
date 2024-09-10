const { Model, DataTypes } = require("sequelize");
const sequelize = require("..config/connection");

class Post extends Model {}

Post.init(
  {
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    text: {
      type: DataTypes.STRING,
    },
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
    user_name: {
      type: DataTypes.STRING,
      references: {
        model: "user",
        key: "name",
      },
    },
    comments: {
      type: DataTypes.ARRAY(DataTypes.JSON),
    },
  },
  {
    sequelize,
    timestamps: true,
    underscored: true,
    modelName: "post",
  }
);
module.exports = Post;
