import { action, observable } from "mobx";

import { GetMemeResponseType } from "../../../types/DataTypes";

class MemeModel {
   id: string;
   name: string;
   @observable caption: string;
   @observable url: string;
   @observable deleteAPIStatus!: number;

   constructor(memeData: GetMemeResponseType) {
      const { id, name, caption, url } = memeData;
      this.id = id;
      this.name = name;
      this.caption = caption;
      this.url = url;
   }

   @action.bound
   updateCaption(caption: string) {
      this.caption = caption;
   }

   @action.bound
   updateURL(url: string) {
      this.url = url;
   }

   @action.bound
   updateDeleteAPIStatus(status: number) {
      this.deleteAPIStatus = status;
   }
}

export default MemeModel;
