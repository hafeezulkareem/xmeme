import tw, { styled } from "twin.macro";

export const MemesContainer = styled.div`
   ${tw`
        w-full md:w-3/5 pt-24px md:pl-2px md:pr-16px md:overflow-y-auto
    `}
   display: grid;
   grid-gap: 24px;
   grid-template-columns: 1fr;
   @media (min-width: 768px) {
      ${({ memesEmpty }) =>
         memesEmpty
            ? `grid-template-columns: 1fr;`
            : `grid-template-columns: 1fr 1fr;`}
   }
`;

export const NoMemesMessage = styled.span`
   ${tw`
        mx-auto self-center
    `}
`;
