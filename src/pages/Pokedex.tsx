import { useCallback, useEffect, useState } from "react"
import api from "../api/axios"
import { useAuth } from "../context/AuthContext"
import { Pokemon } from "../types/Pokemon"
import axios from "axios"
import { typesEnum } from "../utils/TypeEnum"
import PokemonBlock from "../components/PokemonBlock"
import PokedexHeader from "../components/PokedexHeader"

const Pokedex = () => {

  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  const {token} = useAuth()

  const fetchPokemon = useCallback(async () => {
    const response = await api.get('/pokemons/my-pokemons', { headers: { 'Authorization': `Bearer ${token}` } })

    const finalPokemons: Pokemon[] = []

    for (const pokemon of response.data) {
      const fetchedType = await axios.get(`https://pokeapi.co/api/v2/type/${typesEnum[pokemon.type.name as keyof typeof typesEnum]}`)
      const fetchedImage = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name.toLowerCase()}`)
      const image = fetchedImage.data.sprites.other['official-artwork'].front_default
      const type_image = fetchedType.data.sprites['generation-viii']['brilliant-diamond-and-shining-pearl']['name_icon']
      console.log(type_image)
      finalPokemons.push({...pokemon, type_image, image})
    }


    setPokemons(finalPokemons)
  }, [token])

  useEffect(() => {
    fetchPokemon()
  }, [fetchPokemon])

  const handleRefresh = () => {
    fetchPokemon()
  }

  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '15px', padding: '10px', width: '100%'}}>
      <h1>Pokedex</h1>
      <PokedexHeader onRefresh={handleRefresh} />
      <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '10px', flexWrap: 'wrap'}}>
        { pokemons.length > 0 && pokemons.map((pokemon) => (
          <PokemonBlock key={pokemon.id} {...pokemon} />
        ))}
      </div>
    </div>
  )
}


export default Pokedex