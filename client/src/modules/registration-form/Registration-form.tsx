import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { Box, Button } from '@mui/material'
import { ControlledTextField } from '../../components/controlled-text-field/Controlled-text-field.tsx'
import { EMAIL_PATTERN } from './consts/consts.ts'
import { validatePassword } from './helpers/validate-password.ts'
import { useRegistrationMutation } from './api/registration-api.ts'
import { useEffect } from 'react'

interface Inputs {
  email: string
  password: string
  confirmPassword: string
  registrationKey: string
}

export const RegistrationForm = () => {
  const [registration, {data, isLoading}] = useRegistrationMutation()

  const formMethods = useForm<Inputs>({ mode: 'onBlur' })

  const {
    handleSubmit,
    getValues
  } = formMethods

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const {email, password, registrationKey} = data
    registration({email, password, registrationKey})
  }

  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <FormProvider {...formMethods}>
      {isLoading && <h2>loading</h2>}
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
