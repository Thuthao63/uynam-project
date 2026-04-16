const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const WorkflowStep = sequelize.define('WorkflowStep', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  stepId: {
    type: DataTypes.STRING,
    comment: "Thứ tự bước (VD: 01, 02)"
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  desc: {
    type: DataTypes.TEXT
  },
  imageUrl: {
    type: DataTypes.STRING
  },
  icon: {
    type: DataTypes.STRING,
    defaultValue: "📍"
  }
}, {
  timestamps: true
});

module.exports = WorkflowStep;
