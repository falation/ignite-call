import { Button, Heading, MultiStep, Text } from '@ignite-ui/react'
import { useRouter } from 'next/router'
import { signIn, useSession } from 'next-auth/react'
import { ArrowRight, Check } from 'phosphor-react'

import { Container, Header } from '../styles'
import { AuthError, ConnectedBox, ConnectedItem } from './styles'

export default function ConnectCalendar() {
  const router = useRouter()
  const session = useSession()

  const hasAuthError = !!router.query.error
  const isSignedId = session.status === 'authenticated'

  async function onConnectCalenedar() {
    await signIn('google', {
      callbackUrl: '/register/connect-calendar',
    })
  }

  async function onNavigateToNextStep() {
    await router.push('/register/time-intervals')
  }

  return (
    <Container>
      <Header>
        <Heading as="strong">Conecte sua agenda</Heading>
        <Text>
          Conecte o seu calendário para verificar automaticamente as horas
          ocupadas e os novos eventos à medida em que são agendados.
        </Text>
        <MultiStep currentStep={2} size={4} />
      </Header>

      <ConnectedBox>
        <ConnectedItem>
          <Text>Google Calendar</Text>
          {isSignedId ? (
            <Button disabled size="sm" variant="secondary">
              Conectado
              <Check />
            </Button>
          ) : (
            <Button onClick={onConnectCalenedar} size="sm" variant="secondary">
              Conectar
              <ArrowRight />
            </Button>
          )}
        </ConnectedItem>

        {hasAuthError && (
          <AuthError size="sm">
            Falha ao se conectar ao Google, verifique se você habilitou as
            permissões de acesso ao Google Calendar
          </AuthError>
        )}

        <Button disabled={!isSignedId} onClick={onNavigateToNextStep}>
          Próximo passo
          <ArrowRight />
        </Button>
      </ConnectedBox>
    </Container>
  )
}
