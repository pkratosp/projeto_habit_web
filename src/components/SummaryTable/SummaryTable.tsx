// functions
import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { api } from "../../lib/axios"
import { GenareteRangeBetweenDates } from "../../utils/GenareteRangeBetweenDates"

// components
import HabitDay from "../HabitDay/HabitDay"
import HabitDayPlaceHolder from "../HabitDayPlaceHolder/HabitDayPlaceHolder"

// logic
const weekDays = ['D','S','T','Q','Q','S','S']
const summaryDates = GenareteRangeBetweenDates()

const minimumSummaryDateSize = 18 * 7 // 18 weeks
const amoutOfDaysToFil = minimumSummaryDateSize - summaryDates.length

type Summary = Array<{
    id: string
    date: string
    amout: number
    completed: number
}>

export default function SummaryTable() {

    const [summary,setSummary] = useState<Summary>([])

    useEffect(()=>{
        const summary = async () => {
            const summary = await api.get('summary')
            setSummary(summary.data)
        }

        summary()
    },[])

    return (
        <div className="w-full flex">
        
            <div className="grid grid-rows-7 grid-flow-row gap-3">
                {
                    weekDays.map((weekDay,i)=>{
                        return (
                            <div 
                                key={`${weekDay}-${i}`}
                                className="text-zinc-400 text-xl h-10 w-10 flex items-center 
                                justify-center font-bold"
                            >
                                {weekDay}
                            </div>
                        )
                    })
                }
            </div>

            <div className="grid grid-rows-7 grid-flow-col gap-3">
            
                {
                   summary.length > 0 && summaryDates.map(date => {
                        const dayInSummary = summary.find(day => {
                            return dayjs(date).isSame(day.date, 'day')
                        })

                        return (

                            <HabitDay 
                                key={date.toString()}
                                date={date}
                                amount={dayInSummary?.amout} 
                                defaultCompleted={dayInSummary?.completed} 
                            />
                        )
                    })
                }

                {amoutOfDaysToFil > 0 && Array.from({ length:amoutOfDaysToFil }).map((_, i) => {
                    return (
                        <HabitDayPlaceHolder 
                            key={i} 
                        />
                    )
                })}
            </div>

        </div>
    )
}