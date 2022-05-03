import {
    Box,
    Card,
    CardActions,
    CardContent,
    Typography,
    Button,
    Grid,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
} from "@mui/material";
import React, { useEffect, useState } from "react";

function Remarks(props) {
    const [floor, set_floor] = useState("");
    const [unit, set_unit] = useState("");
    const [details, set_details] = useState([]);
    const [floors, set_floors] = useState([]);

    const handle_floor = (e) => {
        set_floor(e.target.value);
    };

    const handle_unit = (e) => {
        set_unit(e.target.value);
    };

    const u = () => {
        return details.find((e) => e.unit_number === unit);
    };

    useEffect(() => {
        const data = new FormData();
        data.append("user_id", props.uid);
        data.append("order_id", props.oid);

        const xhr = new XMLHttpRequest();
        xhr.withCredentials = false;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                set_details(JSON.parse(this.responseText));
                set_floors([...new Set(details.map((it) => it.floor))]);
            }
        });

        xhr.open("POST", "http://localhost/api/v1/details");

        xhr.send(data);
    }, [props]);

    return (
        <React.Fragment>
            <Button sx={{ m: 2 }} fullWidth onClick={() => props.on_back(0)}>
                Go Back
            </Button>
            <Box>
                <FormControl sx={{ m: 2 }} fullWidth>
                    <InputLabel id="floor">Floor</InputLabel>
                    <Select
                        iid="floor"
                        label="Floor"
                        value={floor}
                        onChange={handle_floor}
                    >
                        <MenuItem value="">None</MenuItem>
                        {floors.map((e, i) => (
                            <MenuItem
                                key={i}
                                value={e}
                            >{`Floor ${e}`}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl sx={{ m: 2 }} fullWidth>
                    <InputLabel id="unit">Unit</InputLabel>
                    <Select
                        id="unit"
                        label="Unit"
                        value={unit}
                        onChange={handle_unit}
                    >
                        <MenuItem value="">None</MenuItem>
                        {details
                            .filter((e) => e.floor === floor)
                            .map((e, i) => (
                                <MenuItem
                                    value={e.unit_number}
                                >{`Unit ${e.unit_number}`}</MenuItem>
                            ))}
                    </Select>
                </FormControl>
            </Box>
            {u() !== undefined ? (
                <Grid container justifyContent="center">
                <Card sx={{ minWidth: 300, m: 2 }}>
                    <CardContent>
                        <Typography
                            sx={{ fontSize: 14 }}
                            color="text.secondary"
                            gutterBottom
                        >
                            Floor {u().floor}
                        </Typography>
                        <Typography variant="h5" component="div">
                            {u().unit_number}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            Unit Type {u().unit_type}
                        </Typography>
                        <hr></hr>
                        <Grid container>
                            {Object.keys(u().to_install).map((e, i) => (
                                <Grid key={i} item xs={3}>
                                    {e}
                                    <br></br>
                                    {u().to_install[e]}
                                    <br></br>
                                    {/* {item_desc0[i]}
                                    <br></br>
                                    {item_desc1[i]}
                                    <br></br>
                                    {item_desc2[i]}
                                    <br></br> */}
                                </Grid>
                            ))}
                        </Grid>
                        <CardActions>
                            <Button
                                onClick={() => props.on_detail(props.id)}
                                size="small"
                            >
                                Add Remarks
                            </Button>
                        </CardActions>
                    </CardContent>
                </Card>
                </Grid>
            ) : (
                ""
            )}
        </React.Fragment>
    );
}

export default Remarks;