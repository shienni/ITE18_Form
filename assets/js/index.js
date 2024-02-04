(async function () {
    const provinceUrl = 'https://psgc.gitlab.io/api/provinces/';
    const cityBaseUrl = 'https://psgc.gitlab.io/api/provinces/';

    try {
        const provinceResponse = await fetch(provinceUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!provinceResponse.ok) {
            throw new Error(`HTTP error: ${provinceResponse.status}`);
        }

        const provinceData = await provinceResponse.json();

        const provinceSelector = document.getElementById('province');
        const citySelector = document.getElementById('city');

        provinceData.forEach(province => {
        const option = document.createElement('option');
        option.value = province.code;
        option.text = province.name;
        provinceSelector.appendChild(option);
        });

        provinceSelector.addEventListener('change', async function () {
            const selectedProvinceCode = provinceSelector.value;
            const cityUrl = `${cityBaseUrl}${selectedProvinceCode}/cities/`;

            try {
                const cityResponse = await fetch(cityUrl, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (!cityResponse.ok) {
                    throw new Error(`HTTP error: ${cityResponse.status}`);
                }

                const cityData = await cityResponse.json();

                citySelector.innerHTML = '';

                cityData.forEach(city => {
                    const option = document.createElement('option');
                    option.value = city.code;
                    option.text = city.name;
                    citySelector.appendChild(option);
                });
            } catch (error) {
                console.error(`Fetch error for cities: ${error.message}`);
            }
        });

    } catch (error) {
        console.error(`Fetch error for provinces: ${error.message}`);
    }
})();
