module.exports = (sequelize, Sequelize) => {
    const Upload = sequelize.define(
        "upload",
        {
            id: {
                type: Sequelize.INTEGER,
                field: "id",
                primaryKey: true,
                autoIncrement: true,
            },
            link: {
                type: Sequelize.STRING,
                field: "link",
            },
            dir: {
                type: Sequelize.STRING,
                field: "dir",
            },
            type: {
                type: Sequelize.STRING,
                field: "type",
            },
            project: {
                type: Sequelize.STRING,
                field: "project",
            },
        },
        {
            freezeTableName: true,
            underscored: true,
        }
    );
    return Upload;
};
