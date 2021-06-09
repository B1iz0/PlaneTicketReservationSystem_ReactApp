import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import DialogContent from '@material-ui/core/DialogContent';

import API from "api";
import { refreshCurrentToken } from "services/token-service";

const FlightEditDialogContent = ({ flightForEditing }) => {
    const token = useSelector((state) => state.token);

    return(
        <></>
    );
};

export default FlightEditDialogContent