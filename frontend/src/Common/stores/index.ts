import MemesAPIs from "../../XMeme/services/MemesService/index.api";
import MemesFixtures from "../../XMeme/services/MemesService/index.fixture";
import MemeStore from "../../XMeme/stores/MemeStore";
import UIStore from "../../XMeme/stores/UIStore/UIStore";

const useFixtures = false;

function getPostMemeAPIFixture() {
   if (useFixtures) {
      return new MemesFixtures();
   }
   return new MemesAPIs();
}

const memeStore = new MemeStore(getPostMemeAPIFixture());

const uiStore = new UIStore();
const stores = { memeStore, uiStore };

export default stores;
