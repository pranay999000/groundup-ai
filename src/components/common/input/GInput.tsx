import { InputLabel, Input, Typography } from '@mui/material'
import {  FormikProps, FormikValues } from 'formik'
import './g-input.scss'

interface GFormInputProps<T extends FormikValues>{
    formik: FormikProps<T>
    id:string;
    label:string;
}

export function GFormInput<T extends FormikValues>({formik, id, label}:GFormInputProps<T>) {
    return (
        <div className="custom-input">
            <InputLabel id={id}>{label}</InputLabel>
            <Input required fullWidth id={id} aria-label={id}
                name={id} autoComplete="off" autoFocus 
                value={formik.values[id]}
                onChange={formik.handleChange}
                error={formik.touched[id] && Boolean(formik.errors[id])}/>
            {formik.errors[id] && 
                <Typography variant="error" component="div">
                    {formik.errors[id]}
                </Typography>
            }
        </div>
    )
}

