module.exports = function(sequelize, DataTypes) {
  var RolePermissions = sequelize.define("RolePermissions", {
    user_role: {
      type: DataTypes.STRING,
      allowNull: false
    },
    permission_feature_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  });

  return RolePermissions;
};
