import { Card, CardContent, Grid, Typography } from "@mui/material";
import React from "react";

function Home(props) {
    return (
        <React.Fragment>
            <Grid container justifyContent="center">
                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                        <Typography
                            sx={{ fontSize: 14 }}
                            color="text.secondary"
                            gutterBottom
                        >
                            Welcome
                        </Typography>
                        <Typography variant="h5" component="div">
                            {props.info.name}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            {props.info.type ? "Installer" : "Customer"}
                        </Typography>
                        <Typography variant="body2">
                            Email: {props.info.email}
                            <br />
                            Contact: {props.info.phone}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </React.Fragment>
    );
}

export default Home;