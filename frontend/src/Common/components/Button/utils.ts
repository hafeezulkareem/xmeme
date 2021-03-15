import { colors as colorCodes } from "../../themes/colors";

import { colors } from "./constants";

const {
   default: defaultColor,
   primary,
   secondary,
   success,
   warning,
   danger,
} = colors;

export const getButtonColors = (color) => {
   switch (color) {
      case defaultColor:
         return {
            bgColor: colorCodes.gainsboro,
            hoverBgColorOne: colorCodes.darkGray,
            hoverBgColorTwo: colorCodes.darkGray10,
            textColor: colorCodes.eclipse,
            filledTextColor: colorCodes.eclipse,
         };
      case primary:
         return {
            bgColor: colorCodes.neonBlue,
            hoverBgColorOne: colorCodes.persianBlue,
            hoverBgColorTwo: colorCodes.royalBlue10,
            textColor: colorCodes.neonBlue,
            filledTextColor: colorCodes.white,
         };
      case secondary:
         return {
            bgColor: colorCodes.eclipse,
            hoverBgColorOne: colorCodes.sanJuan,
            hoverBgColorTwo: colorCodes.sanJuan10,
            textColor: colorCodes.eclipse,
            filledTextColor: colorCodes.white,
         };
      case success:
         return {
            bgColor: colorCodes.salem,
            hoverBgColorOne: colorCodes.darkSpringGreen,
            hoverBgColorTwo: colorCodes.darkSpringGreen10,
            textColor: colorCodes.salem,
            filledTextColor: colorCodes.white,
         };
      case warning:
         return {
            bgColor: colorCodes.ecstasy,
            hoverBgColorOne: colorCodes.burntOrange,
            hoverBgColorTwo: colorCodes.burntOrange10,
            textColor: colorCodes.ecstasy,
            filledTextColor: colorCodes.white,
         };
      case danger:
         return {
            bgColor: colorCodes.persianRed,
            hoverBgColorOne: colorCodes.sangria,
            hoverBgColorTwo: colorCodes.sangria10,
            textColor: colorCodes.persianRed,
            filledTextColor: colorCodes.white,
         };
      default:
         return {
            bgColor: colorCodes.gainsboro,
            hoverBgColorOne: colorCodes.darkGray,
            hoverBgColorTwo: colorCodes.darkGray10,
            textColor: colorCodes.eclipse,
            filledTextColor: colorCodes.eclipse,
         };
   }
};
