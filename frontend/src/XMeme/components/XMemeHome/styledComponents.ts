import tw, { styled } from "twin.macro";

import Button from "../../../Common/components/Button";

export const AppContainer = styled.div``;

export const FormAndMemesContainer = styled.div`
   ${tw`
        px-32px md:px-0 flex flex-col md:flex-row
    `}
   height: calc(100vh - 100px);
`;

export const MemesContainer = styled.div`
   ${tw`
      w-full md:w-3/5 flex flex-col justify-center items-center
   `}
   height: calc(100vh - 100px);
`;

export const GetMemesErrorMessage = styled.p`
   ${tw`
      text-center
   `}
`;

export const GetMemesTryAgainButton = styled(Button)``;
