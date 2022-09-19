import React, {useEffect, useState} from 'react';
import { Button, Dialog, DialogContent, DialogActions, DialogTitle, TextField, Grid } from '@material-ui/core';
import { FaPlus } from 'react-icons/fa';
import moment from 'moment';
import LocationSelector from './LocationSelector';
import CatergorySelector from './CatergorySelector';
import UnitSelector from './UnitSelector';
import ExpiryDateSelector from './ExpiryDateSelector';
import ReactDOM from 'react-dom';

const AddIngredient = ({open, handleClose, mode, id}) => {
    const [name, setName] = useState('')
    const [disable, setDisable] = useState(true)
    const [expiryDate, setExpiryDate] = useState(null)
    const [location, setLocation] = useState(null)
    const [category, setCategory] = useState(null)
    const [quantity, setQuantity] = useState(1)
    const [unit, setUnit] = useState(null)
    const [remaining, setRemaining] = useState(100)

    const retriveIngredient = () => {
        if(mode === 'edit'){
            fetch(`/api/ingredient/${id}`, {method: 'GET'}).then((response) => {
                if(response.ok){
                    return response.json()
                }
            }).then((data) => {
                ReactDOM.unstable_batchedUpdates(()=>{
                    setName(data.name);
                    setExpiryDate(new Date(data.expiry_date));
                    setLocation(data.location);
                    setCategory(data.category);
                    setQuantity(data.quantity);
                    setUnit(data.unit);
                    setRemaining(data.remaining);
                })
            })
        }
    }

    useEffect(() => {
        retriveIngredient()
    }, []);

    const handleSubmit = () => {
        const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;

        const requestOptions = {
            method: 'POST',
            headers: {"Content-Type": "application/json", "X-CSRFToken": csrftoken},
            body: JSON.stringify({
                name: name,
                location: location,
                category: category,
                expiry_date: expiryDate? moment(expiryDate).format("YYYY-MM-DD"): null,
                quantity: quantity,
                unit: unit,
                remaining: remaining,
            })
        }

        if(mode === 'create'){
            createIng(requestOptions);
        }else{
            editIng(requestOptions);
        }
    }

    const createIng = (requestOptions) => {
        fetch('/api/add-ingredient/', requestOptions).then((response) => {
            if(response.ok){
                return
            }else{
                alert("Invalid request");
            }
        }).then(() => window.location.reload(false))
    }

    const editIng = (requestOptions) => {
        fetch(`/api/ingredient/${id}/`, requestOptions).then((response) => {
            if(response.ok){
                return
            }else{
                alert("Invalid request");
            }
        }).then(() => window.location.reload(false))
    }

    const add3Days = () => {
        setExpiryDate(moment(new Date()).add(3, 'd')['_d']);
        setDisable(() => true);
    }

    const add1Week = () => {
        setExpiryDate(moment(new Date()).add(1, 'w')['_d']);
        setDisable(() => true);
    }

    const add1Month = () => {
        setExpiryDate(moment(new Date()).add(1, 'm')['_d']);
        setDisable(() => true);
    }

    const enableCustom = () => {
        setDisable(() => false);
    }

    const renderRemaining = () => {
        return <Grid item>
            <TextField label='Remaining' variant='standard' value={remaining} type='number'
            onChange={(e)=> setRemaining(e.target.value)} fullWidth/>
        </Grid>
    }

    return <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{mode==='create'?'Add New ingredient': 'Update Ingredient'}</DialogTitle>
        <DialogContent>
            <TextField label='Name' fullWidth variant='standard' value={name} 
            onChange={(e)=> setName(e.target.value)} required margin='normal'/>

            <ExpiryDateSelector expiryDate={expiryDate} setExpiryDate={setExpiryDate} disable={disable} 
            add3Days={add3Days} add1Week={add1Week}add1Month={add1Month} enableCustom={enableCustom} />

            <Grid container direction='column' spacing={3}>
                <LocationSelector location={location} setLocation={setLocation} />
                <CatergorySelector category={category} setCategory={setCategory} />
                <Grid item container direction='row'>
                    <Grid item>
                        <TextField label='Quantity' value={quantity} onChange={(e)=> setQuantity(e.target.value)} fullWidth></TextField>
                    </Grid>
                    <UnitSelector unit={unit} setUnit={setUnit} />
                </Grid>
                {mode==='create'?<></>: renderRemaining()}
            </Grid>                        
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button startIcon={<FaPlus/>} onClick={handleSubmit}>{mode==='create'?'Add': 'Update'}</Button>
        </DialogActions>
    </Dialog>
};

export default AddIngredient;