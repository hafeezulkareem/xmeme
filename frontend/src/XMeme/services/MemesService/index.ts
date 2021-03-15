import {
   EditMemeRequestType,
   GetMemeResponseType,
   PostMemeRequestType,
   PostMemeResponseType,
} from "../../types/DataTypes";

export interface MemesService {
   postMemeAPI: (data: PostMemeRequestType) => Promise<PostMemeResponseType>;

   getMemesAPI: () => Promise<Array<GetMemeResponseType>>;

   getMemeAPI: (id: string) => Promise<GetMemeResponseType>;

   editMemeAPI: (
      id: string,
      data: EditMemeRequestType
   ) => Promise<{ id: string }>;

   deleteMemeAPI: (id: string) => Promise<{}>;
}
