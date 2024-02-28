import { Controller } from 'react-hook-form'
import TextField from '@mui/material/TextField'
import { ControlledTextFieldProps } from './Controlled-text-field-props.ts'

export const ControlledTextField = ({name, rules, label, sx, type}: ControlledTextFieldProps) => {
  return (
    <Controller
      name={name}
      rules={rules}
      render={({ field: {value = '', onChange, onBlur}, fieldState: { error } }) => (
        <TextField
          sx={sx}
          type={type || 'text'}
          helperText={error ? error.message : null}
          error={!!error}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          fullWidth
          label={label}
          variant="outlined"
          inputProps={{
            maxLength: 50
          }}
        />
      )}
    />
  )
}