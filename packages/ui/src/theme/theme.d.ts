import '@emotion/react';
import {TTheme} from "@/theme/Theme.js";

declare module '@emotion/react' {
    export interface Theme extends TTheme {}
}