import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Text, TextArea, TextInput } from '@ignite-ui/react'
import { CalendarBlank, Clock } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Form, FormHeader, FormActions, FormError } from './styles'

const confirmFormSchema = z.object({
  name: z.string().min(3, { message: 'O nome precisa no mínimo 3 caractetes' }),
  email: z.string().email({ message: 'Digite um e-mail válido' }),
  notes: z.string().nullable(),
})

type ConfirmFormData = z.infer<typeof confirmFormSchema>

export function ConfirmStep() {
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<ConfirmFormData>({
    resolver: zodResolver(confirmFormSchema),
  })

  async function onSubmit(data: ConfirmFormData) {
    //
  }

  return (
    <Form as="form" onSubmit={handleSubmit(onSubmit)}>
      <FormHeader>
        <Text>
          <CalendarBlank />
          22 de Setembro de 2022
        </Text>
        <Text>
          <Clock />
          08:00
        </Text>
      </FormHeader>

      <label>
        <Text size="sm">Nome completo</Text>
        <TextInput placeholder="Seu nome" {...register('name')} />
        {errors.name && <FormError size="sm">{errors.name.message}</FormError>}
      </label>

      <label>
        <Text size="sm">Endereço de e-mail</Text>
        <TextInput
          placeholder="ans@email.com"
          type="email"
          {...register('email')}
        />
        {errors.email && (
          <FormError size="sm">{errors.email.message}</FormError>
        )}
      </label>

      <label>
        <Text size="sm">Obvervações</Text>
        <TextArea {...register('notes')} />
      </label>

      <FormActions>
        <Button type="button" variant="tertiary">
          Cancelar
        </Button>
        <Button disabled={isSubmitting} type="submit">
          Confirmar
        </Button>
      </FormActions>
    </Form>
  )
}
