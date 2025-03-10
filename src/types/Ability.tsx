import { Type } from "./Type";

export interface Ability {
    id: string;
    name: string;
    description: string;
    power: number;
    accuracy: number;
    type: Type;
    category: string;
    pp: number;
    

}