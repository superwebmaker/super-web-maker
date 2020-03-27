module.exports = {
  dialect: 'mysql',
  database: 'super-web-maker',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  timezone: '+08:00',
  define: {
    // create_time & update_time
    timestamps: true,
    // delete_time
    paranoid: true,
    // camelcase -> underscore
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at'
  }
};
