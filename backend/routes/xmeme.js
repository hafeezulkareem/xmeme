const { Router } = require("express");

const {
   getMemes,
   postMeme,
   getMeme,
   deleteMeme,
   editMeme,
} = require("../controllers/xmeme");

const router = Router();

router.post("/memes", postMeme);
router.get("/memes/:id", getMeme);
router.get("/memes", getMemes);
router.delete("/memes/:id", deleteMeme);
router.patch("/memes/:id", editMeme);

module.exports = router;
