import { resolveWithTimeOut } from "../../../Common/utils/TestUtils";

import postMemeAPIResponse from "../../fixtures/postMemeAPIResponse.json";
import getMemesAPIResponse from "../../fixtures/getMemesAPIResponse.json";
import getMemeAPIResponse from "../../fixtures/getMemeAPIResponse.json";

import { MemesService } from ".";

class MemesFixtures implements MemesService {
   postMemeAPI() {
      return resolveWithTimeOut(postMemeAPIResponse);
   }

   getMemesAPI() {
      return resolveWithTimeOut(getMemesAPIResponse);
   }

   getMemeAPI() {
      return resolveWithTimeOut(getMemeAPIResponse);
   }

   editMemeAPI() {
      return resolveWithTimeOut(postMemeAPIResponse);
   }

   deleteMemeAPI() {
      return resolveWithTimeOut({});
   }
}

export default MemesFixtures;
