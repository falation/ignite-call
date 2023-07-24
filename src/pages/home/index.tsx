import { Heading, Text } from '@ignite-ui/react'
import Image from 'next/image'
import { NextSeo } from 'next-seo'

import previewImage from '../../assets/app-preview.png'

import { RequestUsernameForm } from './components'
import { Container, Hero, Preview } from './styles'

export default function Home() {
  return (
    <>
      <NextSeo
        title="Descomplique sua agenda | Ignite Call: Ans"
        description="Conecte seu calendário e permita que as pessoas marquem agendamentos no seu tmepo livre."
      />

      <Container>
        <Hero>
          <Heading as="h1" size="4xl">
            Agendamento descomplicado
          </Heading>

          <Text size="xl">
            Conecte seu calendário e permita que as pessoas marquem agendamentos
            no seu tempo livre.
          </Text>

          <RequestUsernameForm />
        </Hero>

        <Preview>
          <Image
            alt="Calendário simbolizando aplicação em funcionamento"
            height={400}
            quality={100}
            src={previewImage}
          />
        </Preview>
      </Container>
    </>
  )
}
