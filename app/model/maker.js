module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const MakerSchema = new Schema({
    layouts: { type: String }
  });

  return mongoose.model('Maker', MakerSchema);
};
