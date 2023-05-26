// api.js

export async function fetchData(optionValue) {
    try {
        const response = await fetch('https://example.com/api/data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ optionValue }),
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            console.log('Ошибка при получении данных');
            return null;
        }
    } catch (error) {
        console.log('Произошла ошибка при отправке запроса:', error);
        return null;
    }
}
