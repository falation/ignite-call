import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Text, TextInput } from '@ignite-ui/react'
import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Form, FormAnnotation } from './styles'

const claimUsernamgeFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'O usuário precisa ter pelo menos 3 letras.' })
    .regex(/^([a-z\\-]+)$/i, {
      message: 'O usuário pode ter apenas letras e hifens.',
    })
    .transform((username) => username.toLowerCase()),
})

type ClaimUsernameFormData = z.input<typeof claimUsernamgeFormSchema>

export function ClaimUsernameForm() {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<ClaimUsernameFormData>({
    resolver: zodResolver(claimUsernamgeFormSchema),
  })

  async function handleClaimRegister(data: ClaimUsernameFormData) {
    console.log(data)
  }

  return (
    <>
      <Form as="form" onSubmit={handleSubmit(handleClaimRegister)}>
        <TextInput
          placeholder="seu-usuario"
          prefix="ignite.com/"
          size="sm"
          {...register('username')}
        />

        <Button size="sm" type="submit">
          Reservar
          <ArrowRight />
        </Button>
      </Form>

      <FormAnnotation>
        <Text size="sm">
          {errors.username
            ? errors.username.message
            : 'Digite o nome do usuário desejado'}
        </Text>
      </FormAnnotation>
    </>
  )
}
