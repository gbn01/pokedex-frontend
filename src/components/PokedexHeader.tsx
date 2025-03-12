import { Button, TextField } from "@mui/material"
import { useState } from "react";
import SimpleDialog from "./SimpleDialog";




const PokedexHeader = ({ onRefresh }: { onRefresh: () => void }) =>{   
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
        onRefresh();
    }

    return (
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%', gap: '10px'}}>
            <TextField label="Search" variant="outlined" type="search" sx={{width: '50%'}}/>
            <Button variant="contained" color="primary" style={{width: '15%', height: '3rem'}} onClick={() => setOpen(true)}>Add Pokemon</Button>
            <SimpleDialog open={open} onClose={handleClose}/>
        </div>
    )
}

export default PokedexHeader