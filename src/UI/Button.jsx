import './button.less'

const Button = ({title, onclick, states='', className='', type=''})=>{

    const onChange = ()=> onclick(states)

    return (
        <button onClick={onChange} className={`buttonSelect ${className}`} type={type}>{title}</button>
    )
}

export default Button;