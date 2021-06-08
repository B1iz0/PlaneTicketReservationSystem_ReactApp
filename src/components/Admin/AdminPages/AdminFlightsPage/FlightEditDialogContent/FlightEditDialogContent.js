import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

import API from "api";
import { refreshCurrentToken } from "services/token-service";

const FlightEditDialogContent = ({ elementUrl }) => {
    const token = useSelector((state) => state.token);

    const [ flight, setFlight ] = useState();

    useEffect(() => {
        const loadElement = async () => {
            await API.get(`${elementUrl}`, {
                headers: {
                Authorization: "Bearer " + token.jwtToken,
                },
            })
            .then((response) => response.data)
            .then((data) => setFlight(data))
            .catch((error) => {
                refreshCurrentToken(token.refreshToken);
                if (error.response) {
                console.log(error.response.data);
                };
            });
        }

        loadElement();
    }, []);

    return(
        <DialogContent>
            
        </DialogContent>
    );
};

export default FlightEditDialogContent;