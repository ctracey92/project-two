module.exports = function(sequelize, DataTypes) {
  var TaskAssignments = sequelize.define(
    "Task_Assignments",
    {},
  );

  TaskAssignments.associate = (models) => {
    TaskAssignments.belongsTo(models.User);
    TaskAssignments.belongsTo(models.Task);
  };
 
  return TaskAssignments;
};
