const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));


const FIELD_MAPPING = {
    'vidperevozki': 'deal_transport_type', // ID для Вида перевозки
    'otkuda': 'deal_sender',               // ID для Грузоотправителя
    'kuda': 'deal_receiver',               // ID для Грузополучателя
    'kolichestvo mest': 'deal_places',     // ID для Кол-ва мест
    'ves': 'deal_weight',                  // ID для Веса
    'telefon': 'contact_phone',            // ID для Телефона
    'email': 'contact_email',              // ID для Email
    'poroda': 'deal_breed'                 // ID для Породы (животные)
};

app.post('/form-handler', (req, res) => {
    const formData = req.body;

    // Определение тип формы
    const formType = formData.forma;

    let deal = {};
    let contact = {};

    // Обработка общих полей форм
    if (formData.vidperevozki) deal[FIELD_MAPPING['vidperevozki']] = formData.vidperevozki;
    if (formData.otkuda) deal[FIELD_MAPPING['otkuda']] = formData.otkuda;
    if (formData.kuda) deal[FIELD_MAPPING['kuda']] = formData.kuda;
    if (formData.telefon) contact[FIELD_MAPPING['telefon']] = formData.telefon;
    if (formData.email) contact[FIELD_MAPPING['email']] = formData.email;

    // Обработка специфичных полей в зависимости от формы
    switch (formType) {
        case 'Общая':
        case 'Авиаперевозка':
        case 'Автоперевозка':
            if (formData['kolichestvo mest']) deal[FIELD_MAPPING['kolichestvo mest']] = formData['kolichestvo mest'];
            if (formData.ves) deal[FIELD_MAPPING['ves']] = formData.ves;
            break;
        case 'Перевозка животных':
            if (formData.poroda) deal[FIELD_MAPPING['poroda']] = formData.poroda;
            break;
    }

    // Сохранение в CRM через API | Для тестирования сделано через console.log
    console.log('Создаем сделку:', deal);
    console.log('Создаем контакт:', contact);

    res.status(200).send('Данные успешно обработаны');
});

app.listen(3000, () => console.log('Server started on port 3000'));