import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Heading, MultiStep, Text, TextInput } from '@ignite-ui/react'
import { useRouter } from 'next/router'
import { ArrowRight } from 'phosphor-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Container, Form, FormError, Header } from './styles'

const registerFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'O usuário precisa ter pelo menos 3 letras.' })
    .regex(/^([a-z\\-]+)$/i, {
      message: 'O usuário pode ter apenas letras e hifens.',
    })
    .transform((username) => username.toLowerCase()),
  name: z
    .string()
    .min(3, { message: 'O nome precisa ter pelo menos 3 letras.' }),
})

type RegisterFormData = z.input<typeof registerFormSchema>

export default function Register() {
  const router = useRouter()

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    setValue,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  })

  async function onSubmit(data: RegisterFormData) {
    console.log(data)
  }

  useEffect(() => {
    const receivedUsername = router.query.username

    if (receivedUsername) {
      setValue('username', receivedUsername as string)
    }
  }, [router.query.username, setValue])

  return (
    <Container>
      <Header>
        <Heading as="strong">Bem-vindo ao Ignite Call</Heading>
        <Text>
          Precisamos de algumas informações para criar seu perfil! Ah, você pode
          editar essas informações depois.
        </Text>
        <MultiStep currentStep={1} size={4} />
      </Header>

      <Form as="form" onSubmit={handleSubmit(onSubmit)}>
        <label>
          <Text size="sm">Nome de usuário</Text>
          <TextInput
            placeholder="seu-usuario"
            prefix="ignite.com/"
            {...register('username')}
          />
          {errors.username && (
            <FormError size="sm">{errors.username.message}</FormError>
          )}
        </label>

        <label>
          <Text size="sm">Nome completo</Text>
          <TextInput placeholder="Seu nome" {...register('name')} />
          {errors.name && (
            <FormError size="sm">{errors.name.message}</FormError>
          )}
        </label>

        <Button disabled={isSubmitting} type="submit">
          Próximo passo
          <ArrowRight />
        </Button>
      </Form>
    </Container>
  )
}
