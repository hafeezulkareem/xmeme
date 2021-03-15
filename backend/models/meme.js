const { Schema, model } = require("mongoose");

const memeSchema = new Schema(
   {
      name: {
         type: String,
         required: true,
         trim: true,
         maxlength: 100,
      },
      caption: {
         type: String,
         trim: true,
         required: false,
         maxlength: 256,
      },
      url: {
         type: String,
         trim: true,
         required: true,
      },
   },
   { timestamps: true }
);

module.exports = model("Meme", memeSchema);
