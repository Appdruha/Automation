import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { Box, Button, Typography } from '@mui/material'
import { ControlledTextField } from '../../components/controlled-text-field/Controlled-text-field.tsx'
import { EMAIL_PATTERN } from './consts/consts.ts'
import { validatePassword } from './helpers/validate-password.ts'
import { useRegistrationMutation, useAuthorizationMutation } from './api/authorization-api.ts'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { REGISTRATION_ROUTE } from '../../consts/routes.ts'

interface Inputs {
  email: string
  password: string
  confirmPassword?: string
  registrationKey?: string
}

export const AuthorizationForm = () => {
  const { pathname } = useLocation()
  const isRegistration = pathname === REGISTRATION_ROUTE

  const [registration, {}] = useRegistrationMutation()
  const [authorization, {}] = useAuthorizationMutation()

  const formMethods = useForm<Inputs>({ mode: 'onBlur' })

  const { handleSubmit, getValues, reset } = formMethods

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (isRegistration) {
      const { email, password, registrationKey } = data
      await registration({ email, password, registrationKey }).unwrap()
    } else {
      const { email, password } = data
      await authorization({ email, password }).unwrap()
    }
  }

  useEffect(() => {
    reset()
  }, [pathname])

  return (
    <FormProvider {...formMethods}>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          mt: 3,
        }}
      >
        <Typography
          component="h5"
          variant="h5"
          align="center"
          sx={{
            margin: 3,
          }}
        >
          {isRegistration ? 'Регистрация' : 'Авторизация'}
        </Typography>
        <ControlledTextField
          type="email"
          name="email"
          label="Email"
          rules={{
            required: 'Поле не заполнено',
            pattern: {
              value: EMAIL_PATTERN,
              message: 'Неверно указан email',
            },
          }}
        />
        <ControlledTextField
          sx={{
            mt: 3,
          }}
          type="password"
          name="password"
          label="Пароль"
          rules={{
            required: 'Поле не заполнено',
            validate: (value) => validatePassword(value),
          }}
        />
        {isRegistration && (
          <>
            <ControlledTextField
              sx={{
                mt: 3,
              }}
              type="password"
              name="confirmPassword"
              label="Подтвердите пароль"
              rules={{
                required: 'Поле не заполнено',
                validate: (value) => {
                  return value === getValues('password') || 'Пароли не совпадают'
                },
              }}
            />
            <ControlledTextField
              sx={{
                mt: 3,
              }}
              type="text"
              name="registrationKey"
              label="Ключ для регистрации"
              rules={{
                required: 'Поле не заполнено',
              }}
            />
          </>
        )}
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            mt: 3,
          }}
        >
          {isRegistration ? 'Зарегистрироваться' : 'Авторизироваться'}
        </Button>
      </Box>
    </FormProvider>
  )
}
