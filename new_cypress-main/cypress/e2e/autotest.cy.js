describe('Проверка авторитизации', () => {
    const validEmail = 'german@dolnikov.ru';
    const validPassword = 'iLoveqastudio1';
  
    beforeEach(() => {  
      cy.visit('https://login.qa.studio/'); // Переходим на страницу логина перед каждым тестом
    });

    afterEach('Конец теста', function () {
   cy.get('#exitMessageButton > .exitIcon').should('be.visible');
    });


    it('Позитивный кейс', () => {
      
    cy.get('#mail').type(validEmail); // Вводим правильный email
    cy.get('#pass').type(validPassword); // Вводим правильный пароль
    cy.get('#loginButton').click(); // Нажимаем кнопку "Войти"
    cy.get('#messageHeader').contains('Авторизация прошла успешно'); // Проверяем, что появился текст "Авторизован"
    cy.get('#messageHeader').should('be.visible'); //Проверяем что текст виден пользователю
    });

    it('Логика восстановления пароля', () => {
        cy.get('#forgotEmailButton').click(); // Нажимаем восстановить пароль
        cy.get('#mailForgot').type(validEmail); // Вводим правильный email
        cy.get('#restoreEmailButton').click(); // Нажимаем отправить код
        cy.get('#messageHeader').contains('Успешно отправили пароль на e-mail'); // Проверяем, что появился текст "Авторизован"
        cy.get('#messageHeader').should('be.visible'); //Проверяем что текст виден пользователю
        });

     it('Негативный кейс, правильный логин, неправильный пароль', () => {
        cy.get('#mail').type(validEmail); // Вводим правильный email
        cy.get('#pass').type('iLoveqastudio555'); // Вводим НЕправильный пароль
        cy.get('#loginButton').click(); // Нажимаем кнопку "Войти"
        cy.get('#messageHeader').contains('Такого логина или пароля нет'); // Проверяем, что появился текст 
        cy.get('#messageHeader').should('be.visible'); //Проверяем что текст виден пользователю
            });

    it('Негативный кейс, НЕправильный логин, правильный пароль', () => {
      
     cy.get('#mail').type('german@dolnikov1.ru'); // НЕВводим правильный email
     cy.get('#pass').type(validPassword); // Вводим правильный пароль
     cy.get('#loginButton').click(); // Нажимаем кнопку "Войти"
     cy.get('#messageHeader').contains('Такого логина или пароля нет'); // Проверяем, что появился текст 
     cy.get('#messageHeader').should('be.visible'); //Проверяем что текст виден пользователю
    });

    it('Негативный кейс валидации', () => {
      
        cy.get('#mail').type('germandolnikov.ru'); // Вводим правильный email без @
        cy.get('#pass').type(validPassword); // Вводим правильный пароль
        cy.get('#loginButton').click(); // Нажимаем кнопку "Войти"
        cy.get('#messageHeader').contains('Нужно исправить проблему валидации'); // Проверяем, что появился текст "Авторизован"
        cy.get('#messageHeader').should('be.visible'); //Проверяем что текст виден пользователю
        });

        it('Проверка на приведение к строчным буквам', () => {
      
            cy.get('#mail').type('GerMan@Dolnikov.ru'); // Вводим строчными email
            cy.get('#pass').type(validPassword); // Вводим правильный пароль
            cy.get('#loginButton').click(); // Нажимаем кнопку "Войти"
            cy.get('#messageHeader').contains('Авторизация прошла успешно'); // Проверяем, что появился текст "Авторизован"
            cy.get('#messageHeader').should('be.visible'); //Проверяем что текст виден пользователю
            });

  });