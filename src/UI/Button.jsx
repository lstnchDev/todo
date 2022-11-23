import './button.less'

const Button = ({title, onclick, states='', className=''})=>{

    const onChange = ()=> onclick(states)

    return (
        <button onClick={onChange} className={`buttonSelect ${className}`}>{title}</button>
    )
}

export default Button;