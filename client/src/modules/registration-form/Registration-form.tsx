import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { Box, Button } from '@mui/material'
import { ControlledTextField } from '../../components/controlled-text-field/Controlled-text-field.tsx'

interface Inputs {
  email: string
}

export const RegistrationForm = () => {
  const formMethods = useForm<Inputs>({ mode: 'onBlur' })

  const {
    handleSubmit,
  } = formMethods

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data)
  }

  return (
    <FormProvider {...formMethods}>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          mt: 3,
        }}
      >
        <ControlledTextField
          name="email"
          label="email"
          rules={{
            required: 'поле не заполнено',
          }}
        />
        <Button type="submit" variant="contained" fullWidth sx={{
          mt: 3,
        }}>
          Submit
        </Button>
      </Box>
    </FormProvider>
  )
}
