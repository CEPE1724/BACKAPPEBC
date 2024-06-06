var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var categoriaSchema = new Schema({
  
    title: {
        type: String,
        required: true,
        unique: true,
    },
});

module.exports = mongoose.model("Categoria", categoriaSchema);