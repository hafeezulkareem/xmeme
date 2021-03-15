import tw, { styled } from "twin.macro";

import Button from "../../../Common/components/Button";

export const MemeContainer = styled.div`
   ${tw`
        flex flex-col pt-16px bg-white
    `}
   min-width: 250px;
   min-height: 250px;
`;

export const LoaderContainer = styled.div`
   ${tw`
        flex my-auto justify-center
    `}
`;

export const MemeBar = styled.div`
   ${tw`
        flex justify-end px-12px
    `}
`;

export const ErrorInfoContainer = styled.div`
   ${tw`
        flex flex-col my-auto items-center
    `}
`;

export const GetMemeErrorMessage = styled.p`
   ${tw`
        text-center
    `}
`;

export const GetMemeTryAgainButton = styled(Button)``;

export const CloseButton = styled(Button)`
   ${tw`
        p-0 m-0 shadow-none bg-transparent
    `}
   &:hover {
      ${tw`
            bg-transparent
        `}
   }
`;

export const MemeOwnerName = styled.p`
   ${tw`
        font-bold m-0 p-0 mx-12px
    `}
`;

export const MemeCaption = styled.p`
   ${tw`
        font-semibold m-0 p-0 mt-2px mx-12px
    `}
`;

export const MemeImageContainer = styled.div`
   ${tw`
        flex mt-8px
    `}
`;

export const MemeImage = styled.img`
   ${tw`
        w-full object-cover
    `}
`;
