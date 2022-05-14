const Input = ({type, value, onChangeValue, title, ...others}) => {
    return (
        <>
            <label>{title} {value && '✅'}
                <input 
                    name={`input-${title}`}
                    className={`item-form ${!value ? 'disabled' : ''}`}
                    type={type}
                    value={value} 
                    onChange={onChangeValue}
                    {...others}
                />
            </label>
        </>

    )
}

export default Input
