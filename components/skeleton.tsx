interface Props {
    type: string;
}

const Skeleton = ({ type }: Props) => {

    const classes = `skeleton ${type}`
    return (
        <div className={classes}></div>
    )
}

export default Skeleton