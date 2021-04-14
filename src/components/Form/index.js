import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { TextField, Grid, Button, Table, TableBody, TableHead, TableRow, TableCell } from "@material-ui/core";
import "./styles.css"

function Form(){
    const { handleSubmit, register } = useForm({});
    const [codeList, setCodeList] = useState([]);

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/qrcode", {data},
            {headers: { "Content-Type": "application/json"},  credentials: true}).then(function(res){
            setCodeList(codeList.concat(res.data));
        }).catch((error) => (console.log(error)));
    };

    return(
        <div className="app-wrapper">
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <TextField
                            required
                            label="First Name"
                            variant="outlined"
                            inputProps={{...register("first_name"), "className": "form-input" }}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            required
                            label="Last Name"
                            variant="outlined"
                            inputProps={{...register("last_name"), "className": "form-input" }}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            required
                            type="date"
                            label="Date of birth"
                            variant="outlined"
                            inputProps={{...register("birth_date"), "className": "form-input" }}
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            required
                            type="tel"
                            label="Phone number"
                            variant="outlined"
                            inputProps={{...register("phone"), "className": "form-input" }}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="outlined-required"
                            label="Email"
                            type="email"
                            variant="outlined"
                            inputProps={{...register("email"), "className": "form-input" }}
                            fullWidth
                        />
                    </Grid>
                    <Grid item className="button-container" xs={12}>
                        <Button type="submit" variant="contained" color="primary">
                            Create QR-code!
                        </Button>
                    </Grid>
                </Grid>
            </form>
            {codeList.length&&
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">QR-code data</TableCell>
                        <TableCell align="left">QR-code image</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {codeList?.map((data, i) => (
                        <TableRow key={i}>
                            <TableCell>
                                <Table size="small">
                                    <TableBody>
                                        <TableRow><TableCell style={{borderBottom:"none"}}>First name: {data.first_name}</TableCell></TableRow>
                                        <TableRow><TableCell style={{borderBottom:"none"}}>Last name: {data.last_name}</TableCell></TableRow>
                                        <TableRow><TableCell style={{borderBottom:"none"}}>Birth date: {data.birth_date}</TableCell></TableRow>
                                        <TableRow><TableCell style={{borderBottom:"none"}}>Phone number: {data.phone}</TableCell></TableRow>
                                        <TableRow><TableCell style={{borderBottom:"none"}}>Email: {data.email}</TableCell></TableRow>
                                        <TableRow><TableCell style={{borderBottom:"none"}}>Created at: {Date(data.timestamp * 1000)}</TableCell></TableRow>
                                        <TableRow><TableCell style={{borderBottom:"none"}}>Raw timestamp: {data.timestamp}</TableCell></TableRow>
                                    </TableBody>
                                </Table>
                            </TableCell>
                            <TableCell> <img src={data.image} alt="qrcode" /></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            }
        </div>
    )
}
export default Form;