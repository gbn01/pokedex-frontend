import Box from "@mui/material/Box"
import { Pokemon } from "../types/Pokemon"



const PokemonBlock = (pokemon: Pokemon) => {
    
    return (
        <Box>
            <div key={pokemon.id}>
                <img src={pokemon.image} alt={pokemon.name} />
                <h2>{pokemon.name}</h2>
                <img src={pokemon.type_image} alt={pokemon.type.name} />
            </div>
        </Box>
    )
}


export default PokemonBlock