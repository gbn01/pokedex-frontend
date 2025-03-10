import { useEffect, useState } from "react"
import api from "../api/axios"
import { useAuth } from "../context/AuthContext"
import { Pokemon } from "../types/Pokemon"
import axios from "axios"
import { typesEnum } from "../utils/TypeEnum"

const Pokedex = () => {

  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  const {token} = useAuth()

  useEffect(() => {
    const fetchPokemon = async () => {
      const response = await api.get('/pokemons/my-pokemons', { headers: { 'Authorization': `Bearer ${token}` } })

      const finalPokemons: Pokemon[] = []

      for (const pokemon of response.data) {
        const fetchedType = await axios.get(`https://pokeapi.co/api/v2/type/${typesEnum[pokemon.type.name as keyof typeof typesEnum]}`)
        const type_image = fetchedType.data.sprites['generation-viii']['brilliant-diamond-and-shining-pearl']['name_icon']
        console.log(type_image)
        finalPokemons.push({...pokemon, type_image})
      }

      console.log(finalPokemons)

      setPokemons(finalPokemons)
    }
    fetchPokemon()
  }, [token])
  return (
    <div>
      <h1>Pokedex</h1>
      {pokemons.map((pokemon) => (
        <div key={pokemon.id}>
          <h2>{pokemon.name}</h2>
        </div>
      ))}
    </div>
  )
}


export default Pokedex