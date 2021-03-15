import React from "react";
import { Provider } from "mobx-react";

import stores from "./Common/stores";
import XMemeHome from "./XMeme/components/XMemeHome";
import MemeModal from "./XMeme/components/MemeModal";

function App() {
   return (
      <Provider {...stores}>
         <XMemeHome />
         <MemeModal />
      </Provider>
   );
}

export default App;
