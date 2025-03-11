import Box from "@mui/material/Box"
import { Pokemon } from "../types/Pokemon"
import { typeColorEnum } from "../utils/TypeColorEnum"



const PokemonBlock = (pokemon: Pokemon) => {
    
    return (
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2px', padding: '10px', borderRadius: '10px', backgroundColor: typeColorEnum[pokemon.type.name as keyof typeof typeColorEnum]}}>
            <div key={pokemon.id} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '10px', borderRadius: '10px'}}>
                <img src={pokemon.image} alt={pokemon.name} style={{width: '8rem', height: '8rem'}} />
                <h2 style={{fontSize: '1.5rem', fontWeight: 'bold'}}>{pokemon.name}</h2>
                <img src={pokemon.type_image} alt={pokemon.type.name} style={{width: '5rem', height: '1rem', boxShadow: '0px 0px 10px 3px rgba(0, 0, 0, 0.3)'}} />
            </div>
        </Box>
    )
}


export default PokemonBlock