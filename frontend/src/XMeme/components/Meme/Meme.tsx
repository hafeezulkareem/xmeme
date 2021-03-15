import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { FaRegEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

import notFoundLogo from "../../../assets/img/404.svg";

import MemeModel from "../../stores/models/MemeModel";
import UIStore from "../../stores/UIStore";
import { EXISTING_MEME } from "../../constants/UIConstants";

import {
   DeleteButton,
   EditButton,
   MemeCaption,
   MemeContainer,
   MemeImage,
   MemeImageContainer,
   MemeOptionsContainer,
   MemeOwnerName,
   MemeSubTitleBar,
   MemeTitleBar,
} from "./styledComponents";
import {
   getParsedErrorMessage,
   isFetching,
} from "../../../Common/utils/APIUtils";
import cogoToast from "cogo-toast";

interface MemeProps {
   meme: MemeModel;
   deleteMemeAPI: (
      id: string,
      onSuccess: () => void,
      onFailure: () => void
   ) => void;
   deleteMemeAPIError;
}

interface InjectedProps extends MemeProps {
   uiStore: UIStore;
}

@inject("uiStore")
@observer
class Meme extends Component<MemeProps> {
   get injectedProps(): InjectedProps {
      return this.props as InjectedProps;
   }

   get uiStore(): UIStore {
      const { uiStore } = this.injectedProps;
      return uiStore;
   }

   editMeme = (event) => {
      event.stopPropagation();
      const { meme } = this.props;
      const { updateMemeType, updateMemeDetails } = this.uiStore;
      updateMemeType(EXISTING_MEME);
      updateMemeDetails(meme);
   };

   onSuccessDeleteMeme = () => {
      cogoToast.success("Meme deleted successfully!", {
         position: "bottom-center",
      });
   };

   onFailureDeleteMeme = () => {
      const { deleteMemeAPIError } = this.props;
      cogoToast.error(getParsedErrorMessage(deleteMemeAPIError), {
         position: "bottom-center",
      });
   };

   deleteMemeAPI = (event) => {
      event.stopPropagation();
      const {
         deleteMemeAPI,
         meme: { id },
      } = this.props;
      deleteMemeAPI(id, this.onSuccessDeleteMeme, this.onFailureDeleteMeme);
   };

   openMemeModal = (): void => {
      const { updateMemeModalStatus, updateMemeId } = this.uiStore;
      const {
         meme: { id },
      } = this.props;
      updateMemeId(id);
      updateMemeModalStatus(true);
   };

   render() {
      const {
         meme: { id, name, caption, url, deleteAPIStatus },
      } = this.props;
      const {
         memeType,
         meme: { id: editingMemeId },
      } = this.uiStore;
      const showLoader = isFetching(deleteAPIStatus);
      const disableDeleteButton =
         showLoader || (memeType === EXISTING_MEME && id === editingMemeId);
      return (
         <MemeContainer onClick={this.openMemeModal}>
            <MemeTitleBar>
               <MemeOwnerName>{name}</MemeOwnerName>
            </MemeTitleBar>
            <MemeSubTitleBar>
               <MemeCaption>{caption}</MemeCaption>
               <MemeOptionsContainer>
                  <EditButton onClick={this.editMeme}>
                     <FaRegEdit size={16} />
                  </EditButton>
                  <DeleteButton
                     onClick={this.deleteMemeAPI}
                     loading={showLoader}
                     disabled={disableDeleteButton}
                  >
                     <AiFillDelete size={16} />
                  </DeleteButton>
               </MemeOptionsContainer>
            </MemeSubTitleBar>
            <MemeImageContainer>
               <MemeImage
                  alt={caption}
                  src={url}
                  onError={(event) => {
                     event.target.src = notFoundLogo;
                  }}
               />
            </MemeImageContainer>
         </MemeContainer>
      );
   }
}

export default Meme;
