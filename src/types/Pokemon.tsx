import { Ability } from "./Ability";
import { Type } from "./Type";

export interface Pokemon {
    id: string;
    name: string;
    image: string;
    type: Type;
    type_image: string;
    abilities: Ability[];
    weaknesses: Type[];
}