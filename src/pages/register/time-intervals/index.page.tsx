import {
  Button,
  Checkbox,
  Heading,
  MultiStep,
  Text,
  TextInput,
} from '@ignite-ui/react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { ArrowRight } from 'phosphor-react'
import { z } from 'zod'

import { Container, Header } from '../styles'
import {
  IntervalBox,
  IntervalDay,
  IntervalInputs,
  IntervalItem,
  IntervalsContainer,
} from './styles'
import { getWeekDays } from '../../../utils/get-wek-days'

const timeIntervalsFormSchema = z.object({})

export default function TimeIntervals() {
  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    watch,
  } = useForm({
    defaultValues: {
      intervals: [
        { weekDay: 0, enabled: false, startTime: '08:00', endTime: '18:00' },
        { weekDay: 1, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 2, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 3, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 4, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 5, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 6, enabled: false, startTime: '08:00', endTime: '18:00' },
      ],
    },
  })

  const weekDays = getWeekDays()

  const intervals = watch('intervals')

  const { fields } = useFieldArray({
    control,
    name: 'intervals',
  })

  async function onSubmit() {
    //
  }

  return (
    <Container>
      <Header>
        <Heading as="strong">Quase lá</Heading>
        <Text>
          Defina o intervalo de horários que você está disponível em cada dia da
          semana.
        </Text>
        <MultiStep currentStep={3} size={4} />
      </Header>

      <IntervalBox as="form" onSubmit={handleSubmit(onSubmit)}>
        <IntervalsContainer>
          {fields.map((field, index) => (
            <IntervalItem key={field.id}>
              <IntervalDay>
                <Controller
                  control={control}
                  name={`intervals.${index}.enabled`}
                  render={({ field }) => {
                    return (
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(checked) => {
                          field.onChange(checked === true)
                        }}
                      />
                    )
                  }}
                />
                <Text>{weekDays[field.weekDay]}</Text>
              </IntervalDay>
              <IntervalInputs>
                <TextInput
                  disabled={intervals[index].enabled === false}
                  size="sm"
                  step={60}
                  type="time"
                  {...register(`intervals.${index}.startTime`)}
                />
                <TextInput
                  disabled={intervals[index].enabled === false}
                  size="sm"
                  step={60}
                  type="time"
                  {...register(`intervals.${index}.endTime`)}
                />
              </IntervalInputs>
            </IntervalItem>
          ))}
        </IntervalsContainer>

        <Button type="submit">
          Próximo passo
          <ArrowRight />
        </Button>
      </IntervalBox>
    </Container>
  )
}
