import { zodResolver } from '@hookform/resolvers/zod'
import {
  Avatar,
  Button,
  Heading,
  MultiStep,
  Text,
  TextArea,
} from '@ignite-ui/react'
import { GetServerSideProps } from 'next'
import { getServerSession } from 'next-auth'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { buildNextAuthOptions } from '../../api/auth/[...nextauth].api'

import { Container, Header } from '../styles'
import { FormAnnotation, ProfileBox } from './styles'
import { api } from '../../../lib/axios'

const updateProfileFormSchema = z.object({
  bio: z.string(),
})

type UpdateProfileFormData = z.input<typeof updateProfileFormSchema>

export default function UpdateProfile() {
  const router = useRouter()
  const session = useSession()

  const {
    formState: { isSubmitting },
    handleSubmit,
    register,
  } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileFormSchema),
  })

  async function onSubmit(data: UpdateProfileFormData) {
    await api.put('/users/update-profile', {
      bio: data.bio,
    })

    await router.push(`/schedule/${session.data?.user.username}`)
  }

  return (
    <>
      <NextSeo noindex title="Atualize seu perfil | Ignite Call: Ans" />

      <Container>
        <Header>
          <Heading as="strong">Defina sua disponibilidade</Heading>
          <Text>Por último uma breve descrição e uma foto do perfil.</Text>
          <MultiStep currentStep={4} size={4} />
        </Header>

        <ProfileBox as="form" onSubmit={handleSubmit(onSubmit)}>
          <label>
            <Text size="sm">Foto de perfil</Text>
            <Avatar
              alt={session.data?.user.name}
              src={session.data?.user.avatar_url}
            />
          </label>

          <label>
            <Text size="sm">Sobre você</Text>
            <TextArea {...register('bio')} />
            <FormAnnotation size="sm">
              Fale um pouco sobre você. Isto será exibido em sua página pessoal.
            </FormAnnotation>
          </label>
          <Button disabled={isSubmitting} type="submit">
            Finalizar
            <ArrowRight />
          </Button>
        </ProfileBox>
      </Container>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res),
  )

  return {
    props: {
      session,
    },
  }
}
