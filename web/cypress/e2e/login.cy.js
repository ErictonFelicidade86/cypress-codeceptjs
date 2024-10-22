import users from '../fixtures/users.json'
import login from '../support/pages/LoginPage';
import studentPage from '../support/pages/StudentPage';

describe('login', () => {

    it('Deve logar com o perfil do admin', ()=> {
       
        const user = users.admin;
        
        login.doLogin(user);

        studentPage.navbar.userLoggedIn(user.name);
   
    });

    it('Não deve logar com senha incorreta', ()=> {

        const user = users.inv_pass

        login.doLogin(user)
        login.popUpHave('Suas credenciais são inválidas, por favor tente novamente!')
    })

    it('Não deve logar com email não cadastrado', ()=> {

        const user = users.email_not_found

        login.doLogin(user)
        login.popUpHave('Suas credenciais são inválidas, por favor tente novamente!')
    })

    it('Não deve logar com emails incorretos', ()=> {

        const emails = users.inv_emails

        login.go();

        emails.forEach(el => {
            login.fill(el);
            login.submit();
            login.popUpHave('Insira um email válido.');
            login.popUpBack();
        });

    });

    it('Não deve logar com email em branco', ()=> {

        const user = users.empty_email

        login.doLogin(user)
        login.popUpHave('Os campos email e senha são obrigatórios.')
    });

    it('Não deve logar com password em branco', ()=> {

        const user = users.empty_password

        login.doLogin(user)
        login.popUpHave('Os campos email e senha são obrigatórios.')
    });

    it('Não deve logar com email e password em branco', ()=> {

        const user = users.empty_email_password

        login.doLogin(user)
        login.popUpHave('Os campos email e senha são obrigatórios.')
    });
});