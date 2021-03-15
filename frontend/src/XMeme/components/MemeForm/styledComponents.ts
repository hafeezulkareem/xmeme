import tw, { styled } from "twin.macro";

import Button from "../../../Common/components/Button";
import Input from "../../../Common/components/Input";

export const FormContainer = styled.div`
   ${tw`
        w-full md:w-2/5 flex md:p-32px
    `}
`;

export const Form = styled.form`
   ${tw`
        w-full
    `}
`;

export const FormInputContainer = styled.div`
   ${tw`
        flex flex-col mt-12px
    `}
`;

export const FormInput = styled(Input)``;

export const Message = styled.p`
   ${tw`
        text-sangria flex items-center p-0 m-0 my-8px
    `}
`;

export const ButtonsContainer = styled.div`
   ${tw`
        flex
    `}
`;

export const MemeSubmitButton = styled(Button)`
   ${tw`
        mt-12px border border-solid border-2
    `}
   width: 135px;
   &:focus {
      ${tw`
            border-blue-800
        `}
   }
`;

export const ExitMemeEditModeButton = styled(MemeSubmitButton)`
   ${tw`
        w-auto
    `}
   &:focus {
      ${tw`
            border-red-800
        `}
   }
`;
