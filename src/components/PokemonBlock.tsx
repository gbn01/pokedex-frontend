import Box from "@mui/material/Box"
import { Pokemon } from "../types/Pokemon"



const PokemonBlock = (pokemon: Pokemon) => {
    
    return (
        <Box>
            <div key={pokemon.id}>
                <img src={pokemon.image} alt={pokemon.name} />
                <h2>{pokemon.name}</h2>
            </div>
        </Box>
    )
}


export default PokemonBlock