const ERRORS_CODE = {
    EMAIL_NOT_FOUND: 'Пользователь с таким email не зарегистрирован',
    INVALID_PASSWORD: 'Неверный пароль',
    auth: 'Необходима авторизация'
}

export function error (code) {
    return ERRORS_CODE[code] ? ERRORS_CODE[code] : 'Неизвестная ошибка'
}