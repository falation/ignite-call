import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button,
  Checkbox,
  Heading,
  MultiStep,
  Text,
  TextInput,
} from '@ignite-ui/react'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { ArrowRight } from 'phosphor-react'
import { z } from 'zod'

import { api } from '../../../lib/axios'
import { convertTimeStringToMinutes } from '../../../utils/convert-time-string-to-minutes'
import { getWeekDays } from '../../../utils/get-wek-days'

import { Container, Header } from '../styles'
import {
  FormError,
  IntervalBox,
  IntervalDay,
  IntervalInputs,
  IntervalItem,
  IntervalsContainer,
} from './styles'

const timeIntervalsFormSchema = z.object({
  intervals: z
    .array(
      z.object({
        weekDay: z.number().min(0).max(6),
        enabled: z.boolean(),
        startTime: z.string(),
        endTime: z.string(),
      }),
    )
    .length(7)
    .transform((intervals) => intervals.filter((interval) => interval.enabled))
    .refine((intervals) => intervals.length > 0, {
      message: 'Você precisa selecionar pelo menos um dia da semana',
    })
    .transform((intervals) => {
      return intervals.map((interval) => {
        return {
          weekDay: interval.weekDay,
          startTimeInMinutes: convertTimeStringToMinutes(interval.startTime),
          endTimeInMinutes: convertTimeStringToMinutes(interval.endTime),
        }
      })
    })
    .refine(
      (intervals) => {
        return intervals.every(
          (interval) =>
            interval.endTimeInMinutes - 60 >= interval.startTimeInMinutes,
        )
      },
      {
        message:
          'O horário de término deve ser pelo menos 1h distante do início.',
      },
    ),
})

type TimeIntervalsFormInput = z.input<typeof timeIntervalsFormSchema>
type TimeIntervalsFormOutput = z.output<typeof timeIntervalsFormSchema>

export default function TimeIntervals() {
  const router = useRouter()

  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    watch,
  } = useForm<TimeIntervalsFormInput>({
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
    resolver: zodResolver(timeIntervalsFormSchema),
  })

  const weekDays = getWeekDays()

  const intervals = watch('intervals')

  const { fields } = useFieldArray({
    control,
    name: 'intervals',
  })

  async function onSubmit(data: any) {
    const formData = data as TimeIntervalsFormOutput

    await api.post('/users/time-intervals', formData)
    await router.push('/register/update-profile')
  }

  return (
    <>
      <NextSeo
        noindex
        title="Selecione sua disponibilidade | Ignite Call: Ans"
      />

      <Container>
        <Header>
          <Heading as="strong">Quase lá</Heading>
          <Text>
            Defina o intervalo de horários que você está disponível em cada dia
            da semana.
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

          {errors.intervals && (
            <FormError size="sm">{errors.intervals.message}</FormError>
          )}

          <Button disabled={isSubmitting} type="submit">
            Próximo passo
            <ArrowRight />
          </Button>
        </IntervalBox>
      </Container>
    </>
  )
}
