import { create } from "apisauce";

import { apiMethods } from "../../../Common/constants/APIConstants";
import { networkCallWithAxios } from "../../../Common/utils/APIUtils";

import {
   EditMemeRequestType,
   GetMemeResponseType,
   PostMemeRequestType,
   PostMemeResponseType,
} from "../../types/DataTypes";

import { endpoints } from "../endpoints";

import { MemesService } from ".";

class MemesAPIs implements MemesService {
   api: Record<string, any>;

   constructor() {
      this.api = create({
         baseURL: "https://xmeme-stream.herokuapp.com/api/",
      });
   }

   postMemeAPI(
      requestData: PostMemeRequestType
   ): Promise<PostMemeResponseType> {
      return networkCallWithAxios(
         this.api,
         endpoints.memes,
         requestData,
         apiMethods.post
      );
   }

   getMemesAPI(): Promise<Array<GetMemeResponseType>> {
      return networkCallWithAxios(
         this.api,
         endpoints.memes,
         {},
         apiMethods.get
      );
   }

   getMemeAPI(id: string): Promise<GetMemeResponseType> {
      return networkCallWithAxios(
         this.api,
         `${endpoints.memes}${id}/`,
         {},
         apiMethods.get
      );
   }

   editMemeAPI(
      id: string,
      requestData: EditMemeRequestType
   ): Promise<{ id: string }> {
      return networkCallWithAxios(
         this.api,
         `${endpoints.memes}${id}/`,
         requestData,
         apiMethods.patch
      );
   }

   deleteMemeAPI(id: string): Promise<{}> {
      return networkCallWithAxios(
         this.api,
         `${endpoints.memes}${id}/`,
         {},
         apiMethods.delete
      );
   }
}

export default MemesAPIs;
