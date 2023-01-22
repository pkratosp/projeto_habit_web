// icons
import { Check } from "phosphor-react";

// components
import * as Checkbox from '@radix-ui/react-checkbox';
import { FormEvent, useState } from "react";
import { api } from "../../lib/axios";

const valibleWeekDay = [
    'Domingo',
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sabado'
]

export default function NewHabitForm() {

    const [title,setTitle] = useState<string>('')
    const [weekDays,setWeekDays] = useState<number[]>([])

    async function CreatedHabit(event:FormEvent) {
        event.preventDefault()

        if(!title || weekDays.length === 0) {
            return;
        }

        await api.post('habits',{
            title: title,
            weekDays: weekDays
        })

        setTitle('')
        setWeekDays([])
        alert('Seu hábito foi criado com sucesso!')
    }

    // trata se o usuario esta adicionando ou retirando os dias do formulario
    function handleToggleWeekDay (weekDay:number) {
        if(weekDays.includes(weekDay)){
            // remove ele de dentro se ja estiver la

            const weekDaysWithRemoveOne = weekDays.filter(day => day !== weekDay)

            setWeekDays(weekDaysWithRemoveOne)
        }else {
            const weekDayWithAddedOne = [...weekDays, weekDay]

            setWeekDays(weekDayWithAddedOne)
        }
    }

    return (
        <form onSubmit={CreatedHabit} className="w-full flex flex-col mt-6">
 
            <label 
                className="font-semibold leading-tight"
                htmlFor="title"
            >
                Qual o seu comprometimento
            </label>
            <input 
                className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400"
                id="title"
                type="text"
                placeholder="Exercícios, dormir bem, etc..."
                autoFocus 
                value={title}
                onChange={event => setTitle(event.target.value)}
            />


            <label 
                className="font-semibold leading-tight mt-4"
                htmlFor=""
            >
                Qual a recorência
            </label>

            <div className="mt-3 flex flex-col gap-2">
                {
                    valibleWeekDay.map((weekDay,index) => {
                        return (

                            <Checkbox.Root
                                key={weekDay}
                                checked={weekDays.includes(index)}
                                onCheckedChange={()=>{
                                    handleToggleWeekDay(index)
                                }}
                                className="flex items-center gap-3 group"
                            >
                                <div
                                    className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800
                                group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-colors"
                                >
                                    <Checkbox.Indicator>
                                        <Check
                                            className="text-white"
                                            size={20}
                                        />
                                    </Checkbox.Indicator>
                                </div>

                                <span
                                    className="leading-tight text-white"
                                >
                                    {weekDay}
                                </span>
                            </Checkbox.Root>

                        )
                    })
                }
                
            </div>

            <button 
                className="mt-6 p-4 rounded-lg flex items-center gap-3 font-semibold bg-green-600
                justify-center hover:bg-green-500 transition-colors"
                type="submit"
            >
                <Check size={22} weight="bold" />
                Confirmar
            </button>
        </form>
    )
}