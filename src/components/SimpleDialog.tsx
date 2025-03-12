import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import axios, { AxiosError } from "axios";
import { Pokemon } from "../types/Pokemon";
import { Ability } from "../types/Ability";
import weaknessesEnum from "../utils/WeaknessessEnum";

export interface SimpleDialogProps {
    open: boolean;
    onClose: () => void;
}

const SimpleDialog = ({ open, onClose }: SimpleDialogProps) => {
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [abilities, setAbilities] = useState([]);
    const [selectedAbilities, setSelectedAbilities] = useState<string[]>([]);
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const { token } = useAuth();


    useEffect(() => {
        const fetchAbilities = async () => {
            const response = await api.get(`/abilities/type/${type}`, { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } });
            setAbilities(response.data);    
        }
        if(type) {
            fetchAbilities();
        }
    }, [token, type]);

    const handleClose = () => {
        setName('');
        setType('');
        setAbilities([]);
        setSelectedAbilities([]);
        setPokemon(null);
        onClose();
    }

    const handleAddPokemon = async () => {
        if(name && type && selectedAbilities.length > 0 && selectedAbilities.length <= 4) {
            const pokemon = {
                name: name,
                type: type,
                abilities: selectedAbilities,
                weaknesses: weaknessesEnum[type as keyof typeof weaknessesEnum]
            }
            console.log(pokemon);
            const response = await api.post('/pokemons/add-to-trainer', pokemon, { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`, 'Access-Control-Allow-Origin': '*' } });
            if(response.status === 201) {
                handleClose();
            }
        }
    }

    const handleSearchPokemon = async () => {
        const fetchPokemon = async () => {
            try {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`, { headers: { 'Content-Type': 'application/json' } });
                if(response.status === 200) {
                    setPokemon({...response.data, image: response.data.sprites.other['official-artwork'].front_default});
                    setType(response.data.types[0].type.name.charAt(0).toUpperCase() + response.data.types[0].type.name.slice(1));
                }
            } catch (error: unknown) {
                if(error instanceof AxiosError && error.response?.status === 404) {
                    setPokemon(null);
                    setType('');
                    setAbilities([]);
                    setSelectedAbilities([]);
                }
            }
        }
        fetchPokemon();
    }

    const handleSelectAbilities = (value: string | string[]) => {
        setSelectedAbilities(value as string[]);    
    }


    
    return (
        <Dialog open={open} onClose={handleClose} fullWidth>
            <DialogTitle>Add Pokemon</DialogTitle>
            <DialogContent style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px'}}>
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '20px'}}>
                    <TextField label="Name" variant="outlined" type="text" style={{width: '100%'}} onChange={(e) => setName(e.target.value)}/>
                    <Button variant="contained" color="primary" onClick={handleSearchPokemon}>Search</Button>
                </div>
                
                <img src={pokemon?.image} alt={pokemon?.name} style={{width: '15%', height: '15%'}}/>
                <TextField label="Type" slotProps={{input: {readOnly: true}}} variant="outlined" type="text" style={{width: '100%'}} value={type}/>
                <Select label="Abilities" multiple value={selectedAbilities} style={{width: '100%'}} onChange={(e) => handleSelectAbilities(e.target.value)}>
                    {abilities && abilities?.map((ability: Ability) => (
                        <MenuItem key={ability.name} value={ability.name}>{ability.name}</MenuItem>
                    ))}
                </Select>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="primary" disabled={!name || !type || selectedAbilities.length === 0} onClick={handleAddPokemon}>Add</Button>
            </DialogActions>
        </Dialog>
    )
}

export default SimpleDialog;