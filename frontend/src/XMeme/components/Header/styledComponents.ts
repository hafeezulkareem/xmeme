import tw, { styled } from "twin.macro";

export const HeaderContainer = styled.div`
   ${tw`
        flex flex-col justify-center items-center shadow
    `}
   height: 100px;
`;

export const Title = styled.h1`
   ${tw`
        p-0 m-0
    `}
`;

export const Description = styled.p`
   ${tw`
        p-0 m-0 mt-4px
    `}
`;
