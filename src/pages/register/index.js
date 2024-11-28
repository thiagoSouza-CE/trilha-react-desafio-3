import React from 'react'
import { useNavigate  } from "react-router-dom";

import { Header } from '../../components/Header';
import { Input } from '../../components/Input';

import { MdSupervisedUserCircle, MdEmail, MdLock } from 'react-icons/md'
import { Button } from '../../components/Button';
import { api } from '../../services/api';

import { Container, DivForm, DivInfo, Title, SubTitle, Wrapper, FooterForm, Row, HaveAccount, HaveAccountLink } from './style';
import { useForm } from "react-hook-form";

const Register = () => {

  const navigate = useNavigate()

    const { control, handleSubmit, formState: { errors  } } = useForm({
        reValidateMode: 'onChange',
        mode: 'onChange',
    });

    const onSubmit = async (formData) => {
        const payload = {
          name: formData.userName,
          email: formData.email,
          senha: formData.senha,
        };
        try{
            const {data} = await api.post(`/users`, payload);
            if(data.id !== ''){
                navigate('/login') 
                return
            } else {
              alert('Preencha todos os campos corretamente')
            }
        }catch(e){
          alert(e.errors)
        }
    };

  return (
    <>
       <Header/>
       <Container>
        <DivInfo>
          <Title>
            A plataforma para você aprender com experts, 
            dominar as principais tecnologias e entrar mais rápido nas empresas mais desejadas.
          </Title>
        </DivInfo>
        <DivForm>
            <Title>Comece agora grátis</Title>
            <SubTitle>Crie sua conta e make the change._</SubTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input name = "username" placeholder="Nome Completo" leftIcon={<MdSupervisedUserCircle />} name="userName"  control={control} />
                {errors.email && <span>E-mail é obrigatório</span>}
                <Input name = "email" placeholder="E-mail" leftIcon={<MdEmail />} name="email"  control={control} />
                {errors.email && <span>E-mail é obrigatório</span>}
                <Input name = "password" type="password" placeholder="Password" leftIcon={<MdLock />}  name="senha" control={control} />
                {errors.senha && <span>Senha é obrigatório</span>}
                <Wrapper>
                  <Button title="Entrar" variant="secondary" type="submit"/>
                </Wrapper>
            </form>
            <FooterForm>
              <SubTitle>Ao clicar em "criar minha conta grátis",<br/> declaro que aceito as Políticas de Privacidade e os Termos de Uso da DIO.</SubTitle>
            </FooterForm>
            <Row>
              <HaveAccount>Já tenho conta. <HaveAccountLink href='/login'>Fazer login</HaveAccountLink></HaveAccount>
            </Row>
        </DivForm>
       </Container>
    </>
  )
}

export  { Register };
