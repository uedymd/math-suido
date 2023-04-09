const zen2han = (str) => {
    str = str.replace(/[０-９]/g, function (s) {
        return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
    })
    return str;
}


window.onload = () => {
    const input = document.querySelectorAll('.block__input input');

    const prev_out = document.getElementById('prev_out');
    const this_out = document.getElementById('this_out');
    const prev_store = document.getElementById('prev_store');
    const this_store = document.getElementById('this_store');
    const all_math = document.querySelector('.block__input--all-math input');
    const store_price = document.querySelector('.block__input--all-store input');

    input.forEach(elem => {
        elem.addEventListener('change', function () {
            const val = elem.value;
            const changeVal = zen2han(val);
            const price = document.getElementById('price_all');
            const price_val = Number(price.value);
            const math_store = Number(this_store.value) - Number(prev_store.value);
            const math_out = Number(this_out.value) - Number(prev_out.value);
            const text = document.querySelector('.block__math p strong');
            console.log(text);
            elem.value = changeVal;

            if (prev_out.value !== '' && this_out.value !== '') {
                if (math_out < 0) {
                    alert('水道量がマイナスです。')
                }
            }
            if (prev_store.value !== '' && this_store.value !== '') {
                if (math_store < 0) {
                    alert('水道量がマイナスです。')
                } else {
                    all_math.value = math_store;
                    text.textContent = math_store;
                }
            }

            if (math_out > 0 && math_store > 0 && price_val > 0) {
                const result = price_val * ((math_store - math_out) / math_store);
                store_price.value = Math.round(result);
            }


        });
    });
}