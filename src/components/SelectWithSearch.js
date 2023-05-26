import React, { useState, useEffect } from 'react';
import Select from 'react-select';

function SelectWithSearch({ apiUrl, required, name }) {
    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isTouched, setIsTouched] = useState(false);

    useEffect(() => {
        if (isTouched) {
            // Отправка запроса к API для получения данных
            fetch(apiUrl)
                .then((response) => response.json())
                .then((data) => {
                    const options = data.map((item) => ({
                        value: item.id,
                        label: item.name + '   ' + item.id,
                    }));

                    // Установка полученных данных в состояние options
                    setOptions(options);
                    console.log(data[0]);
                    // Установка полученных данных в состояние options
                    // setOptions(data);
                })
                .catch((error) => {
                    console.error('Ошибка при получении данных:', error);
                });
        }
    }, [apiUrl, isTouched]);

    const handleSelectChange = (selectedOption) => {
        setSelectedOption(selectedOption);
        console.log('asdfasf', selectedOption.value);
    };

    const handleSelectBlur = () => {
        setIsTouched(true);
    };

    const handleSelectFocus = () => {
        setIsTouched(false);
    };

    const isInvalid = required && isTouched && !selectedOption;

    return (
        <div>
            <Select
                options={options}
                isSearchable={true}
                placeholder="Выберите опцию"
                value={selectedOption}
                onChange={handleSelectChange}
                onBlur={handleSelectBlur}
                onFocus={handleSelectFocus}
                name={name} // Добавлен атрибут name
            />
            {isInvalid && <span style={{ color: 'red' }}>Выберите опцию</span>}
        </div>
    );
}

export default SelectWithSearch;
