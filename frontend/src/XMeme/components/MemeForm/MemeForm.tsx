import React, { Component, ReactElement } from "react";
import { observable, reaction } from "mobx";
import { inject, observer } from "mobx-react";
import cogoToast from "cogo-toast";
import { GiBeveledStar } from "react-icons/gi";

import Button from "../../../Common/components/Button";
import {
   getParsedErrorMessage,
   isFetching,
} from "../../../Common/utils/APIUtils";
import { urlRegex } from "../../../Common/constants/RegexConstants";

import {
   EditMemeRequestType,
   PostMemeRequestType,
} from "../../types/DataTypes";
import UIStore from "../../stores/UIStore";
import { EXISTING_MEME, NEW_MEME } from "../../constants/UIConstants";
import MemeModel from "../../stores/models/MemeModel";

import {
   ButtonsContainer,
   ExitMemeEditModeButton,
   Form,
   FormContainer,
   FormInput,
   FormInputContainer,
   MemeSubmitButton,
   Message,
} from "./styledComponents";

interface MemeFormProps {
   postMemeAPI: (
      data: PostMemeRequestType,
      onSuccess: () => void,
      onFailure: () => void
   ) => void;
   postMemeAPIStatus: number;
   postMemeAPIError;
   editMemeAPI: (
      id: string,
      data: EditMemeRequestType,
      onSuccess: () => void,
      onFailure: () => void
   ) => void;
   editMemeAPIStatus: number;
   editMemeAPIError;
}

interface InjectedProps extends MemeFormProps {
   uiStore: UIStore;
}

@inject("uiStore")
@observer
class MemeForm extends Component<MemeFormProps> {
   @observable name!: string;
   @observable caption!: string;
   @observable url!: string;

   constructor(props) {
      super(props);
      this.initFormData();
   }

   componentWillUnmount() {
      this.getMemeDetailsFromUIStore();
   }

   initFormData = () => {
      this.name = "";
      this.caption = "";
      this.url = "";
   };

   get injectedProps(): InjectedProps {
      return this.props as InjectedProps;
   }

   get uiStore(): UIStore {
      const { uiStore } = this.injectedProps;
      return uiStore;
   }

   getMemeDetailsFromUIStore = reaction(
      () => {
         const { meme } = this.uiStore;
         return meme;
      },
      (meme: MemeModel) => {
         const { memeType } = this.uiStore;
         const { name, caption, url } = meme;
         if (memeType === EXISTING_MEME) {
            this.name = name;
            this.caption = caption;
            this.url = url;
         }
      }
   );

   onChangeName = (event) => {
      this.name = event.target.value;
   };

   onChangeCaption = (event) => {
      this.caption = event.target.value;
   };

   onChangeURL = (event) => {
      this.url = event.target.value;
   };

   onSuccessPostingMeme = () => {
      cogoToast.success("Meme added successfully!", {
         position: "bottom-center",
      });
      this.initFormData();
   };

   onFailurePostingMeme = () => {
      const { postMemeAPIError } = this.props;
      cogoToast.error(getParsedErrorMessage(postMemeAPIError), {
         position: "bottom-center",
      });
   };

   postMemeAPI = () => {
      const { postMemeAPI } = this.props;
      if (this.name && this.caption && this.url) {
         if (this.url.match(urlRegex)) {
            postMemeAPI(
               { name: this.name, caption: this.caption, url: this.url },
               this.onSuccessPostingMeme,
               this.onFailurePostingMeme
            );
         } else {
            cogoToast.error("Enter a valid URL!", {
               position: "bottom-center",
            });
         }
      } else {
         cogoToast.error("Fill all the fields!", {
            position: "bottom-center",
         });
      }
   };

   onSuccessEditMeme = () => {
      cogoToast.success("Meme edited successfully!", {
         position: "bottom-center",
      });
      this.changeMemeTypeToNew();
   };

   onFailureEditMeme = () => {
      const { editMemeAPIError } = this.props;
      cogoToast.error(getParsedErrorMessage(editMemeAPIError), {
         position: "bottom-center",
      });
   };

   editMemeAPI = () => {
      const { editMemeAPI } = this.props;
      const { meme } = this.uiStore;
      if (meme.caption !== this.caption || meme.url !== this.url) {
         if (this.caption && this.url) {
            editMemeAPI(
               meme.id,
               { caption: this.caption, url: this.url },
               this.onSuccessEditMeme,
               this.onFailureEditMeme
            );
         } else {
            cogoToast.error("Fill all the fields!", {
               position: "bottom-center",
            });
         }
      } else {
         cogoToast.error("Change the details to update the meme", {
            position: "bottom-center",
         });
      }
   };

   onSubmitMeme = (event) => {
      event.preventDefault();
      const { memeType } = this.uiStore;
      if (memeType === EXISTING_MEME) {
         this.editMemeAPI();
      } else {
         this.postMemeAPI();
      }
   };

   changeMemeTypeToNew = () => {
      const { clearStore } = this.uiStore;
      this.initFormData();
      clearStore();
   };

   render(): ReactElement {
      const { postMemeAPIStatus, editMemeAPIStatus } = this.props;
      const { memeType } = this.uiStore;
      const showButtonLoader =
         isFetching(postMemeAPIStatus) || isFetching(editMemeAPIStatus);
      return (
         <FormContainer>
            <Form onSubmit={this.onSubmitMeme}>
               <FormInputContainer>
                  <FormInput
                     label="Meme Owner"
                     placeholder="Enter your full name"
                     input={this.name}
                     onChange={this.onChangeName}
                     fullWidth
                     disabled={memeType === EXISTING_MEME}
                  />
               </FormInputContainer>
               <FormInputContainer>
                  <FormInput
                     label="Caption"
                     placeholder="Be creative with the caption"
                     input={this.caption}
                     onChange={this.onChangeCaption}
                     fullWidth
                  />
               </FormInputContainer>
               <FormInputContainer>
                  <FormInput
                     label="Meme URL"
                     placeholder="Enter URL of your meme here"
                     input={this.url}
                     onChange={this.onChangeURL}
                     fullWidth
                  />
               </FormInputContainer>
               <Message>
                  <GiBeveledStar size={16} /> All fields are required
               </Message>
               <ButtonsContainer>
                  <MemeSubmitButton
                     size={Button.sizes.large}
                     color={Button.colors.primary}
                     type="submit"
                     loading={showButtonLoader}
                     disabled={showButtonLoader}
                  >
                     {memeType === NEW_MEME ? "Submit Meme" : "Update Meme"}
                  </MemeSubmitButton>
                  {memeType === EXISTING_MEME ? (
                     <ExitMemeEditModeButton
                        size={Button.sizes.large}
                        color={Button.colors.danger}
                        type="button"
                        onClick={this.changeMemeTypeToNew}
                     >
                        Exit Editing Mode
                     </ExitMemeEditModeButton>
                  ) : null}
               </ButtonsContainer>
            </Form>
         </FormContainer>
      );
   }
}

export default MemeForm;
