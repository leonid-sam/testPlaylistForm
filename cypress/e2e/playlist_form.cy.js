describe('Playlist Form Test', () => {
    beforeEach(() => {
        // Переходимо на головну сторінку перед кожним тестом
        cy.visit('https://vite-react-alpha-lemon.vercel.app/');
    });

    it('Should search for a track and add it to the playlist (with safety checks)', () => {
        // Перевіряємо, чи є поле пошуку, перед тим як вводити текст
        cy.get('input#\\:r0\\:').should('exist').then((input) => {
            if (input) {
                cy.wrap(input).type('Summer Breeze');
            } else {
                cy.log('Search input not found');
            }
        });

        // Перевіряємо наявність треку і натискаємо на чекбокс
        cy.contains('p', 'Summer Breeze').should('exist').then((track) => {
            if (track) {
                cy.wrap(track)
                    .parent().parent()
                    .find('input[type="checkbox"]')
                    .check({ force: true });

                // Натискаємо кнопку додавання треку
                cy.wrap(track)
                    .parent().parent()
                    .find('button')
                    .click();

                // Перевіряємо, що трек з'явився у плейлисті
                cy.get('#playlist').should('contain', 'Summer Breeze');
            } else {
                cy.log('Track "Summer Breeze" not found');
            }
        });
    });

    it('Should add multiple tracks to the playlist (with safety checks)', () => {
        const tracks = ['Summer Breeze', 'Autumn Leaves'];

        tracks.forEach((track) => {
            cy.contains('p', track).should('exist').then((trackElement) => {
                if (trackElement) {
                    cy.wrap(trackElement)
                        .parent().parent()
                        .find('input[type="checkbox"]')
                        .check({ force: true });

                    cy.wrap(trackElement)
                        .parent().parent()
                        .find('button')
                        .click();

                    // Перевіряємо наявність треку в плейлисті
                    cy.get('#playlist').should('contain', track);
                } else {
                    cy.log(`Track "${track}" not found`);
                }
            });
        });
    });

    it('Should add a track to the playlist and verify time duration (with safety checks)', () => {
        cy.contains('p', 'Winter Winds').should('exist').then((track) => {
            if (track) {
                // Вибираємо трек
                cy.wrap(track)
                    .parent().parent()
                    .find('input[type="checkbox"]')
                    .check({ force: true });

                // Натискаємо кнопку додавання треку
                cy.wrap(track)
                    .parent().parent()
                    .find('button')
                    .click();

                // Перевіряємо, що трек з'явився у плейлисті
                cy.get('#playlist').should('contain', 'Winter Winds');

                // Перевіряємо наявність часу і правильність його значення
                cy.wrap(track)
                    .parent().parent()
                    .next() // Переходимо до блоку, що містить тривалість
                    .should('exist').then((durationElement) => {
                    if (durationElement) {
                        cy.wrap(durationElement).should('contain', '04:00');
                    } else {
                        cy.log('Duration element for "Winter Winds" not found');
                    }
                });
            } else {
                cy.log('Track "Winter Winds" not found');
            }
        });
    });
});
