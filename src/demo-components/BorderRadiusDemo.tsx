import { TextField, Theme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { createPragmaticTheme } from '../constants/theme';

export type BorderDemoProps = {
    setTheme: React.Dispatch<React.SetStateAction<Theme>>;
}

function BorderRadiusDemo({setTheme}: BorderDemoProps){
    const defaultBorderRadius: number = 16;
    const [borderRadius, setBorderRadius] = useState(defaultBorderRadius);
  
    const handleBorderRadiusChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
        value != '' ? setBorderRadius(parseInt(value)) : console.log("Number can't be blank");
    };

    useEffect(() => {
        setTheme(createPragmaticTheme({ borderRadius }));
      }, [borderRadius]);
    return (
        <TextField label="Border Radius" onChange={handleBorderRadiusChange} value={borderRadius} type="number" />
    )
}

export default BorderRadiusDemo
