import { observable, action } from "mobx";

import { apiStatus } from "../../../Common/constants/APIConstants";

import { MemesService } from "../../services/MemesService";
import {
   EditMemeRequestType,
   GetMemeResponseType,
   PostMemeRequestType,
   PostMemeResponseType,
} from "../../types/DataTypes";

import MemeModel from "../models/MemeModel";

class MemeStore {
   memesService: MemesService;

   @observable getMemesAPIStatus!: number;
   @observable getMemesAPIError;
   @observable memes: Array<MemeModel>;
   @observable postMemeAPIStatus!: number;
   @observable postMemeAPIError;
   @observable getMemeAPIStatus!: number;
   @observable getMemeAPIError;
   @observable singleMeme: MemeModel | null;
   @observable editMemeAPIStatus!: number;
   @observable editMemeAPIError;
   @observable deleteMemeAPIError;

   constructor(memesService: MemesService) {
      this.memesService = memesService;
      this.memes = [];
      this.singleMeme = null;
   }

   @action.bound
   setPostMemeAPIStatus(status: number): void {
      this.postMemeAPIStatus = status;
   }

   @action.bound
   setPostMemeAPIError(error: any): void {
      this.postMemeAPIError = error;
   }

   @action.bound
   setPostMemeAPIResponse(
      response: PostMemeResponseType | null,
      requestData: PostMemeRequestType
   ): void {
      if (response) {
         const { id } = response;
         const { name, caption, url } = requestData;
         this.memes.unshift(new MemeModel({ id, name, caption, url }));
      }
   }

   @action.bound
   async postMemeAPI(
      requestData: PostMemeRequestType,
      onSuccess: Function = (): void => {},
      onFailure: Function = (): void => {}
   ) {
      const postMemePromise = this.memesService.postMemeAPI(requestData);
      this.setPostMemeAPIStatus(apiStatus.loading);
      await postMemePromise
         .then((data) => {
            this.setPostMemeAPIStatus(apiStatus.success);
            this.setPostMemeAPIResponse(data, requestData);
            onSuccess();
         })
         .catch((err) => {
            this.setPostMemeAPIStatus(apiStatus.failed);
            this.setPostMemeAPIError(err);
            onFailure();
         });
   }

   @action.bound
   setGetMemesAPIStatus(status: number): void {
      this.getMemesAPIStatus = status;
   }

   @action.bound
   setGetMemesAPIError(error: any): void {
      this.getMemesAPIError = error;
   }

   @action.bound
   setGetMemesAPIResponse(response: Array<GetMemeResponseType> | null): void {
      if (response) {
         response.forEach((meme) => {
            const { id, name, caption, url } = meme;
            this.memes.push(new MemeModel({ id, name, caption, url }));
         });
      }
   }

   @action.bound
   async getMemesAPI(
      onSuccess: Function = (): void => {},
      onFailure: Function = (): void => {}
   ) {
      const getMemesPromise = this.memesService.getMemesAPI();
      this.setGetMemesAPIStatus(apiStatus.loading);
      await getMemesPromise
         .then((response) => {
            this.setGetMemesAPIStatus(apiStatus.success);
            this.setGetMemesAPIResponse(response);
            onSuccess();
         })
         .catch((err) => {
            this.setGetMemesAPIStatus(apiStatus.failed);
            this.setGetMemesAPIError(err);
            onFailure();
         });
   }

   @action.bound
   setGetMemeAPIStatus(status: number): void {
      this.getMemeAPIStatus = status;
   }

   @action.bound
   setGetMemeAPIError(error: any): void {
      this.getMemeAPIError = error;
   }

   @action.bound
   setGetMemeAPIResponse(response: GetMemeResponseType | null): void {
      if (response) {
         const { id, name, caption, url } = response;
         this.singleMeme = new MemeModel({ id, name, caption, url });
      }
   }

   @action.bound
   async getMemeAPI(
      id: string,
      onSuccess: Function = (): void => {},
      onFailure: Function = (): void => {}
   ) {
      const getMemePromise = this.memesService.getMemeAPI(id);
      this.setGetMemeAPIStatus(apiStatus.loading);
      await getMemePromise
         .then((data) => {
            this.setGetMemeAPIStatus(apiStatus.success);
            this.setGetMemeAPIResponse(data);
            onSuccess();
         })
         .catch((err) => {
            this.setGetMemeAPIStatus(apiStatus.failed);
            this.setGetMemeAPIError(err);
            onFailure();
         });
   }

   @action.bound
   clearSingleMeme() {
      this.singleMeme = null;
   }

   @action.bound
   setEditMemeAPIStatus(status: number): void {
      this.editMemeAPIStatus = status;
   }

   @action.bound
   setEditMemeAPIError(error: any): void {
      this.editMemeAPIError = error;
   }

   @action.bound
   setEditMemeAPIResponse(
      id: string,
      updatedMemeData: EditMemeRequestType
   ): void {
      const meme = this.memes.find((meme) => meme.id === id);
      if (meme) {
         const { caption, url } = updatedMemeData;
         if (caption) {
            meme.updateCaption(caption);
         }
         if (url) {
            meme.updateURL(url);
         }
      }
   }

   @action.bound
   async editMemeAPI(
      id: string,
      requestData: EditMemeRequestType,
      onSuccess: Function = (): void => {},
      onFailure: Function = (): void => {}
   ) {
      const editMemePromise = this.memesService.editMemeAPI(id, requestData);
      this.setEditMemeAPIStatus(apiStatus.loading);
      await editMemePromise
         .then((data) => {
            this.setEditMemeAPIStatus(apiStatus.success);
            this.setEditMemeAPIResponse(id, requestData);
            onSuccess();
         })
         .catch((err) => {
            this.setEditMemeAPIStatus(apiStatus.failed);
            this.setEditMemeAPIError(err);
            onFailure();
         });
   }

   @action.bound
   setDeleteMemeAPIStatus(id: string, status: number): void {
      const meme = this.memes.find((meme) => meme.id === id);
      if (meme) {
         meme.updateDeleteAPIStatus(status);
      }
   }

   @action.bound
   setDeleteMemeAPIError(error: any): void {
      this.deleteMemeAPIError = error;
   }

   @action.bound
   deleteMeme(id: string): void {
      this.memes = this.memes.filter((meme) => meme.id !== id);
   }

   @action.bound
   async deleteMemeAPI(
      id: string,
      onSuccess: Function = (): void => {},
      onFailure: Function = (): void => {}
   ) {
      const deleteMemePromise = this.memesService.deleteMemeAPI(id);
      this.setDeleteMemeAPIStatus(id, apiStatus.loading);
      await deleteMemePromise
         .then(() => {
            this.setDeleteMemeAPIStatus(id, apiStatus.success);
            this.deleteMeme(id);
            onSuccess();
         })
         .catch((err) => {
            this.setDeleteMemeAPIStatus(id, apiStatus.failed);
            this.setDeleteMemeAPIError(err);
            onFailure();
         });
   }
}

export default MemeStore;
