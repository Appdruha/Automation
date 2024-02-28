import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { Box, Button } from '@mui/material'
import { ControlledTextField } from '../../components/controlled-text-field/Controlled-text-field.tsx'
import { EMAIL_PATTERN } from './consts/consts.ts'
import { validatePassword } from './helpers/validate-password.ts'

interface Inputs {
  email: string
  password: string
  confirmPassword: string
  registrationKey: string
}

export const RegistrationForm = () => {
  const formMethods = useForm<Inputs>({ mode: 'onBlur' })

  const {
    handleSubmit,
    getValues
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
          type='email'
          name="email"
          label="Email"
          rules={{
            required: 'Поле не заполнено',
            pattern: {
              value: EMAIL_PATTERN,
              message: 'Неверно указан email'
            }
          }}
        />
        <ControlledTextField
          sx={{
            mt: 3,
          }}
          type='password'
          name="password"
          label="Пароль"
          rules={{
            required: 'Поле не заполнено',
            validate: (value) => validatePassword(value)
          }}
        />
        <ControlledTextField
          sx={{
            mt: 3,
          }}
          type='password'
          name="confirmPassword"
          label="Подтвердите пароль"
          rules={{
            required: 'Поле не заполнено',
            validate: (value) => {
              return value === getValues('password') || 'Пароли не совпадают'
            }
          }}
        />
        <ControlledTextField
          sx={{
            mt: 3,
          }}
          type='text'
          name="registrationKey"
          label="Ключ для регистрации"
          rules={{
            required: 'Поле не заполнено'
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
