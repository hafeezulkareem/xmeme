import React, { Component, ReactNode } from "react";
import { inject, observer } from "mobx-react";
import { ClipLoader } from "react-spinners";

import {
   getParsedErrorMessage,
   isFailed,
   isFetching,
} from "../../../Common/utils/APIUtils";
import { colors } from "../../../Common/themes/colors";
import Button from "../../../Common/components/Button";

import MemeStore from "../../stores/MemeStore";

import Header from "../Header";
import MemeForm from "../MemeForm";
import Memes from "../Memes";

import {
   AppContainer,
   FormAndMemesContainer,
   GetMemesErrorMessage,
   GetMemesTryAgainButton,
   MemesContainer,
} from "./styledComponents";

interface XMemeHomeProps {}

interface InjectedProps extends XMemeHomeProps {
   memeStore: MemeStore;
}

@inject("memeStore")
@observer
class XMemeHome extends Component<XMemeHomeProps> {
   componentDidMount() {
      this.getMemes();
   }

   get injectedProps(): InjectedProps {
      return this.props as InjectedProps;
   }

   get memeStore(): MemeStore {
      const { memeStore } = this.injectedProps;
      return memeStore;
   }

   getMemes = (): void => {
      this.memeStore.getMemesAPI();
   };

   renderMemes = (): ReactNode => {
      const {
         getMemesAPIStatus,
         getMemesAPIError,
         memes,
         deleteMemeAPI,
         deleteMemeAPIError,
      } = this.memeStore;
      if (isFetching(getMemesAPIStatus)) {
         return (
            <MemesContainer>
               <ClipLoader size={48} color={colors.blueWhale} />
            </MemesContainer>
         );
      }
      if (isFailed(getMemesAPIStatus)) {
         return (
            <MemesContainer>
               <GetMemesErrorMessage>
                  {getParsedErrorMessage(getMemesAPIError)}
               </GetMemesErrorMessage>
               <GetMemesTryAgainButton
                  color={Button.colors.primary}
                  onClick={this.getMemes}
               >
                  Retry
               </GetMemesTryAgainButton>
            </MemesContainer>
         );
      }
      return (
         <Memes
            memes={memes}
            deleteMemeAPI={deleteMemeAPI}
            deleteMemeAPIError={deleteMemeAPIError}
         />
      );
   };

   render() {
      return (
         <AppContainer>
            <Header />
            <FormAndMemesContainer>
               <MemeForm
                  postMemeAPI={this.memeStore.postMemeAPI}
                  postMemeAPIStatus={this.memeStore.postMemeAPIStatus}
                  postMemeAPIError={this.memeStore.postMemeAPIError}
                  editMemeAPI={this.memeStore.editMemeAPI}
                  editMemeAPIStatus={this.memeStore.editMemeAPIStatus}
                  editMemeAPIError={this.memeStore.editMemeAPIError}
               />
               {this.renderMemes()}
            </FormAndMemesContainer>
         </AppContainer>
      );
   }
}

export default XMemeHome;
