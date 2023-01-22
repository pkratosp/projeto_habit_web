import clsx from 'clsx'

// components
import * as Popover from '@radix-ui/react-popover';
import ProgressBar from '../ProgressBar/ProgressBar';
import dayjs from 'dayjs';
import { HabitDayList } from '../HabitDayList/HabitDayList';
import { useState } from 'react';

interface Props {
    date: Date
    defaultCompleted?: number
    amount?: number
}

export default function HabitDay({ defaultCompleted = 0,amount = 0, date }: Props) {

    const [completed,setCompleted] = useState(defaultCompleted)

    const completedPercented = amount > 0 ? Math.round((completed / amount) * 100) : 0

    const dayAndMoth = dayjs(date).format('DD/MM')
    const dayOfWeek = dayjs(date).format('dddd')


    function handleCompletedChange(completed: number) {
        setCompleted(completed)
    }

    return (
        <Popover.Root>
            <Popover.Trigger 
                className={clsx('w-10 h-10 rounded-lg transition-colors',{
                    'bg-zinc-900 border-2 border-zinc-800': completedPercented === 0,
                    'bg-violet-900 border-violet-700': completedPercented > 0 && completedPercented < 20,
                    'bg-violet-800 border-violet-600': completedPercented >= 20 && completedPercented < 40,
                    'bg-violet-700 border-violet-500': completedPercented >= 40 && completedPercented < 60,
                    'bg-violet-600 border-violet-500': completedPercented >= 60 && completedPercented < 80,
                    'bg-violet-500 border-violet-400': completedPercented >= 80,
                })}
            />

            <Popover.Portal>
                <Popover.Content className="min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col">
                    {/* conteudo */}
                    <Popover.Arrow height={8} width={16} className="fill-zinc-900"/>

                    <span className="font-semibold text-zinc-400">{dayOfWeek}</span>
                    <span className="mt-1 font-extralight leading-tight text-3xl">{dayAndMoth}</span>

                    <ProgressBar progress={completedPercented}/>

                    <HabitDayList date={date} onCompletedChange={handleCompletedChange}/>
                    

                </Popover.Content>
            </Popover.Portal>

        </Popover.Root>
    )
}