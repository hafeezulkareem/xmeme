const Meme = require("../models/meme");

exports.postMeme = (req, res) => {
   const {
      body: { name, caption, url },
   } = req;

   Meme.find({ url }).exec((err, item) => {
      if (item.length > 0) {
         return res.status(409).json({ error: "Meme already posted!" });
      } else {
         const meme = new Meme({
            name,
            caption,
            url,
         });
         meme.save((err, meme) => {
            if (err) {
               return res.status(400).json({ error: "Unable to post meme" });
            }
            return res.status(200).json({ id: meme.id });
         });
      }
   });
};

exports.getMeme = (req, res) => {
   const {
      params: { id },
   } = req;

   Meme.findById(id).exec((err, meme) => {
      if (err) {
         return res.status(400).json({ error: "Unable to get the meme" });
      }
      if (!meme) {
         return res.status(404).json({ error: "Meme doesn't exist" });
      }
      const { id, name, caption, url } = meme;
      return res.status(200).json({ id, name, caption, url });
   });
};

exports.getMemes = (req, res) => {
   const page = req.query.page ? parseInt(req.query.page) : 0;
   const limit = req.query.limit ? parseInt(req.query.limit) : 100;

   Meme.find()
      .skip(page * limit)
      .limit(limit)
      .sort([["createdAt", "desc"]])
      .exec((err, items) => {
         if (err) {
            return res.status(400).json({ error: "Unable to get the memes" });
         }
         const memes = [];
         items.forEach((item) => {
            memes.push({
               id: item.id,
               name: item.name,
               caption: item.caption,
               url: item.url,
            });
         });
         return res.status(200).json(memes);
      });
};

exports.deleteMeme = (req, res) => {
   const {
      params: { id },
   } = req;

   Meme.findByIdAndDelete(id).exec((err, item) => {
      if (err) {
         return res.status(400).json({ error: "Invalid meme id" });
      }
      return res.status(200).json({});
   });
};

exports.editMeme = (req, res) => {
   const {
      params: { id },
      body: { caption, url },
   } = req;

   const updatedData = {};
   if (caption) {
      updatedData.caption = caption;
   }
   if (url) {
      updatedData.url = url;
   }

   Meme.find({ url, caption }).exec((err, item) => {
      if (item.length > 0) {
         return res.status(409).json({ error: "Meme already posted!" });
      } else {
         Meme.findByIdAndUpdate(id, updatedData, {
            upsert: true,
            useFindAndModify: false,
         }).exec((err, meme) => {
            if (err) {
               return res.status(400).json({ error: "Invalid meme id" });
            }
            return res.status(200).json({});
         });
      }
   });
};
