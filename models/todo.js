module.exports = (sequelize, DataTypes) => {
    const Todo = sequelize.define('Todo', {
        text: {
            type: DataTypes.STRING
        },
        isCompleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        createdDate: {
            type: DataTypes.DATE
        }
    })
    return Todo;
}

