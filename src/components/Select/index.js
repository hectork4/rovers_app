const Select = ({title, value, onChangeFunction, options}) => {

    return (
        <div>
            <label>{title}</label>
                <select 
                    value={value} 
                    onChange={onChangeFunction} 
                    className='item-form'
                    data-testid="select"
                >
                    <option disabled>
                        {title}
                    </option>
                    {options.map(eachRover => 
                        <option 
                            key={eachRover} 
                            data-testid="select-option"
                        >
                            {eachRover}
                        </option>
                    )}
                </select>
            </div>
    )
}

export default Select
