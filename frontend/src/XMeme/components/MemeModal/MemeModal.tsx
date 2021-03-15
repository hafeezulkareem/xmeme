import React, { Component, ReactElement } from "react";
import { inject, observer } from "mobx-react";
import Modal from "react-modal";
import { reaction } from "mobx";
import { ClipLoader } from "react-spinners";
import { AiOutlineCloseCircle } from "react-icons/ai";

import notFoundLogo from "../../../assets/img/404.svg";
import Button from "../../../Common/components/Button";
import {
   getParsedErrorMessage,
   isFailed,
   isFetching,
} from "../../../Common/utils/APIUtils";
import { colors } from "../../../Common/themes/colors";

import UIStore from "../../stores/UIStore";
import MemeStore from "../../stores/MemeStore";

import "./styles.css";
import {
   CloseButton,
   ErrorInfoContainer,
   GetMemeErrorMessage,
   GetMemeTryAgainButton,
   LoaderContainer,
   MemeBar,
   MemeCaption,
   MemeContainer,
   MemeImage,
   MemeImageContainer,
   MemeOwnerName,
} from "./styledComponents";

interface MemeModalProps {}

interface InjectedProps extends MemeModalProps {
   memeStore: MemeStore;
   uiStore: UIStore;
}

@inject("uiStore", "memeStore")
@observer
class MemeModal extends Component {
   componentWillUnmount() {
      this.getMemeDetails();
   }

   get injectedProps(): InjectedProps {
      return this.props as InjectedProps;
   }

   get memeStore(): MemeStore {
      const { memeStore } = this.injectedProps;
      return memeStore;
   }

   get uiStore(): UIStore {
      const { uiStore } = this.injectedProps;
      return uiStore;
   }

   getMemeDetailsAPI = (): void => {
      const {
         memeStore: { getMemeAPI },
         uiStore: { memeId },
      } = this.injectedProps;
      getMemeAPI(memeId);
   };

   getMemeDetails = reaction(
      () => {
         const { showMemeModal } = this.uiStore;
         return showMemeModal;
      },
      (showMemeModal: boolean) => {
         if (showMemeModal) {
            this.getMemeDetailsAPI();
         }
      }
   );

   closeMemeModal = (): void => {
      const { updateMemeModalStatus } = this.uiStore;
      const { clearSingleMeme } = this.memeStore;
      clearSingleMeme();
      updateMemeModalStatus(false);
   };

   renderMeme = observer(
      (): ReactElement => {
         const {
            getMemeAPIStatus,
            getMemeAPIError,
            singleMeme,
         } = this.memeStore;
         if (isFetching(getMemeAPIStatus)) {
            return (
               <MemeContainer>
                  <LoaderContainer>
                     <ClipLoader size={48} color={colors.blueWhale} />
                  </LoaderContainer>
               </MemeContainer>
            );
         }
         if (isFailed(getMemeAPIStatus)) {
            return (
               <MemeContainer>
                  <MemeBar>
                     <CloseButton onClick={this.closeMemeModal}>
                        {<AiOutlineCloseCircle size={24} />}
                     </CloseButton>
                  </MemeBar>
                  <ErrorInfoContainer>
                     <GetMemeErrorMessage>
                        {getParsedErrorMessage(getMemeAPIError)}
                     </GetMemeErrorMessage>
                     <GetMemeTryAgainButton
                        color={Button.colors.primary}
                        onClick={this.getMemeDetailsAPI}
                     >
                        Retry
                     </GetMemeTryAgainButton>
                  </ErrorInfoContainer>
               </MemeContainer>
            );
         }
         if (singleMeme) {
            const { name, caption, url } = singleMeme;
            return (
               <MemeContainer>
                  <MemeBar>
                     <CloseButton onClick={this.closeMemeModal}>
                        {<AiOutlineCloseCircle size={24} />}
                     </CloseButton>
                  </MemeBar>
                  <MemeOwnerName>{name}</MemeOwnerName>
                  <MemeCaption>{caption}</MemeCaption>
                  <MemeImageContainer>
                     <MemeImage
                        alt={caption}
                        src={url}
                        onError={(event) => (event.target.src = notFoundLogo)}
                     />
                  </MemeImageContainer>
               </MemeContainer>
            );
         }
         return <></>;
      }
   );

   render() {
      const { showMemeModal } = this.uiStore;
      const { renderMeme: RenderMeme } = this;
      return (
         <Modal
            isOpen={showMemeModal}
            onRequestClose={this.closeMemeModal}
            className="meme-modal"
            overlayClassName="meme-overlay"
            closeTimeoutMS={300}
            ariaHideApp={false}
         >
            <RenderMeme />
         </Modal>
      );
   }
}

export default MemeModal;
