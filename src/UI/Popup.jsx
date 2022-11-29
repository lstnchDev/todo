import './popup.less'

/**
 * 
 * @param {React.ReactNode} children - jsx элемент переданный в родительский компонент Popup
 * @returns {React.ReactElement} - компонент для определения всех модальных окон в единый стиль
 */
const Popup = ({children})=>{
    return (
        <div className="popup">
            {children}
        </div>
    )
}

export default Popup;