import { useEffect, useState } from 'react';
import { api } from '../../lib/axios'; // api 

// icons
import { Check } from 'phosphor-react';

// components
import * as Checkbox from '@radix-ui/react-checkbox';
import dayjs from 'dayjs';

interface Props {
    date: Date
    onCompletedChange: (completed:number) => void
}

interface HabitsInfo {
    possibilitHabits: Array<{
        id: string
        title: string
        created_at: string
    }>
    completedHabits: string[]
}

export function HabitDayList({ date, onCompletedChange }:Props) {

    const [habitsInfo,setHabitsInfo] = useState<HabitsInfo>()

    useEffect(()=>{

        api.get('day',{
            params: {
                date: date.toISOString()
            }
        }).then(response => {
            setHabitsInfo(response.data)
        })

    },[])

    // nao deixa o usuario desmar caso o dia ja passou
    const isDateInPast = dayjs(date).endOf('day').isBefore(new Date())

    // desmarca e marca
    async function handleToggleHabit(habitId:string){
        await api.patch(`habits/${habitId}/toggle`)


        const isHabitAlreadyCompleted = habitsInfo!.completedHabits.includes(habitId)

        let completedHabits: string[] = []

        if(isHabitAlreadyCompleted){
            // remove da lista
            completedHabits = habitsInfo!.completedHabits.filter(id => id !== habitId)
        }else {
            // adiciona na lista
            completedHabits = [...habitsInfo!.completedHabits, habitId]
        }

        setHabitsInfo({
            possibilitHabits: habitsInfo!.possibilitHabits,
            completedHabits
        })

        onCompletedChange(completedHabits.length)
    }

    return (
        <>
            <div className="mt-6 flex flex-col gap-3">
                {
                    habitsInfo?.possibilitHabits.map((habit)=> {
                        return (
                            <Checkbox.Root
                                key={habit.id}
                                onCheckedChange={()=> {
                                    handleToggleHabit(habit.id)
                                }}
                                defaultChecked={habitsInfo.completedHabits.includes(habit.id)}
                                disabled={isDateInPast}
                                className="flex items-center gap-3 group disabled:cursor-not-allowed"
                            >
                                <div
                                    className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800
                                group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500"
                                >
                                    <Checkbox.Indicator>
                                        <Check
                                            className="text-white"
                                            size={20}
                                        />
                                    </Checkbox.Indicator>
                                </div>

                                <span
                                    className="font-semibold text-xl leading-tight text-white group-data-[state=checked]:line-through
                                group-data-[state=checked]:text-zinc-400"
                                >
                                    {habit.title}
                                </span>
                            </Checkbox.Root>

                        )
                    })
                }
            </div>
        </>
    )
}