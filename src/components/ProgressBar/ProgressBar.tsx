interface Props {
    progress: number
}

export default function ProgressBar(props: Props) {

    let progress = props.progress

    const progressStyles = {
        width: progress > 100 ? `${100}%` : `${progress}%`
    }

    return (

        <div className="h-3 rounded-xl bg-zinc-700 w-full mt-4">
            <div
                // para acessibilidade
                role="progressbar"
                aria-label="Progresso de habitos completados neste dia"
                aria-valuenow={props.progress}

                className="h-3 bg-violet-600 rounded-xl transition-all"
                style={progressStyles}
            />
        </div>

    )
}