import React, { Component } from "react";
import { observer } from "mobx-react";

import MemeModel from "../../stores/models/MemeModel";
import Meme from "../Meme/Meme";

import { MemesContainer, NoMemesMessage } from "./styledComponents";

interface MemesProps {
   memes: Array<MemeModel>;
   deleteMemeAPI: (
      id: string,
      onSuccess: () => void,
      onFailure: () => void
   ) => void;
   deleteMemeAPIError;
}

@observer
class Memes extends Component<MemesProps> {
   render() {
      const { memes, deleteMemeAPI, deleteMemeAPIError } = this.props;
      const totalMemes = memes.length;
      const firstHalfMemes = memes.slice(0, Math.ceil(totalMemes / 2));
      const secondHalfMemes = memes.slice(
         Math.ceil(totalMemes / 2),
         totalMemes
      );
      const memesEmpty = memes.length === 0;
      return (
         <MemesContainer memesEmpty={memesEmpty}>
            {memesEmpty ? (
               <NoMemesMessage>No Memes &#128533;</NoMemesMessage>
            ) : (
               <>
                  <div>
                     {firstHalfMemes.map((meme) => (
                        <Meme
                           key={meme.id}
                           meme={meme}
                           deleteMemeAPI={deleteMemeAPI}
                           deleteMemeAPIError={deleteMemeAPIError}
                        />
                     ))}
                  </div>
                  <div>
                     {secondHalfMemes.map((meme) => (
                        <Meme
                           key={meme.id}
                           meme={meme}
                           deleteMemeAPI={deleteMemeAPI}
                           deleteMemeAPIError={deleteMemeAPIError}
                        />
                     ))}
                  </div>
               </>
            )}
         </MemesContainer>
      );
   }
}

export default Memes;
