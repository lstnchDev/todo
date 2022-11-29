import './button.less'
/**
 * 
 * @param {string} title - название кнопки 
 * @param {EventListener} onclick - слушатель для кнопки 
 * @param {boolean} states - переменная для передачи булен значения для setTasksState в Main.jsx, необязательный
 * @param {string} className - дополнительный класс для css, для доп кастомизации кнопок, необязательный
 * @param {type} string - тип для определения значения type для кнопки, необязательный
 * 
 * @returns {React.ReactElement} - компонент кнопки
 */
const Button = ({title, onclick, states='', className='', type='button'})=>{

    const onChange = ()=> onclick(states)

    return (
        <button onClick={onChange} className={`buttonSelect ${className}`} type={type}>{title}</button>
    )
}

export default Button;