import { Box, styled } from '@ignite-ui/react'

export const ConnectedBox = styled(Box, {
  marginTop: '$6',

  display: 'flex',
  flexDirection: 'column',
  gap: '$4',
})

export const ConnectedItem = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  padding: '$4 $6',

  border: '1px solid $gray600',
  borderRadius: '$md',
})
