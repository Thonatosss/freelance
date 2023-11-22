const TOKEN = "6956288167:AAHuR7oOShLoxF1MEcaLUOj_gk_TouvRYIo";
const CHAT_ID = "-1001533686542";
const URL = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

document.getElementById('modal').addEventListener('submit', function (e) {
    e.preventDefault();
    let message = `Заявка з сайту!\n`;
    message += `Ім'я: ${this.formName.value}\nНомер телефону:${this.yourPhone.value}`;
    fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chat_id: CHAT_ID,
            parse_mode: 'html',
            text: `${message}`
        })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            window.location.href = 'thanks.html';
            this.yourPhone.value = '';
            this.formName.value = '';

        })
        .catch(error => {
            console.log(error);
        });
});
