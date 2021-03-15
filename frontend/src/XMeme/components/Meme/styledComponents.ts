import tw, { styled } from "twin.macro";
import Button from "../../../Common/components/Button";

export const MemeContainer = styled.div`
   ${tw`
        w-full flex mb-24px flex-col rounded-6px cursor-pointer
    `}
   box-shadow: 1.5px 2.5px 2.5px rgba(0, 0, 0, 0.4);
`;

export const MemeBar = styled.div`
   ${tw`
        flex justify-between mx-12px
    `}
`;

export const MemeTitleBar = styled(MemeBar)`
   ${tw`
        mt-12px
    `}
`;

export const MemeOwnerName = styled.span`
   ${tw`
        font-bold
    `}
`;

export const MemePostedTime = styled.span``;

export const MemeSubTitleBar = styled(MemeBar)`
   ${tw`
        my-8px
    `}
`;

export const MemeCaption = styled.span`
   ${tw`
        font-semibold
    `}
`;

export const MemeOptionsContainer = styled.div`
   ${tw`
      flex
   `}
`;

export const EditButton = styled(Button)`
   ${tw`
      bg-transparent p-4px shadow-none
   `}
   &:hover {
      ${tw`
         bg-transparent
      `}
   }
`;

export const DeleteButton = styled(EditButton)`
   ${tw`
      ml-8px
   `}
`;

export const MemeImageContainer = styled.div`
   ${tw`
      flex
   `}
`;

export const MemeImage = styled.img`
   ${tw`
        w-full object-cover rounded-b-6px
    `}
`;
