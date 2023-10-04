import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../@/components/ui/card';
import { Label } from '../../@/components/ui/label';
import { Input } from '../../@/components/ui/input';
import { Button, buttonVariants } from '../../@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import useAuth from '../hooks/useAuth';
import { AlertCircle } from 'lucide-react';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '../../@/components/ui/alert';

export default function Login() {
  const form = useForm();
  const { authError, authLoading, login } = useAuth();
  const navigate = useNavigate();

  // Essa aqui é a função de submissão do formulário
  // "data" são os valores do formulário
  async function onSubmit(data) {
    // Aqui você pode chamar APIs
    // Você pode enviar dados para o backend
    // E assim por diante

    // Faz login
    await login(data.email, data.password);

    // Se der certo, manda para a home do sistema
    navigate('/');
  }

  return (
    <div className="w-96 mx-auto">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Entre com email e senha para logar</CardDescription>
        </CardHeader>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col text-left space-y-1.5">
                <Label htmlFor="name">Email</Label>
                <Input
                  placeholder="Entre com seu email"
                  type="email"
                  // Registra um campo dentro do useForm()
                  // required: diz que o campo é obrigatório
                  {...form.register('email', {
                    required: {
                      value: true,
                      message: 'Email é um campo obrigatório',
                    },
                  })}
                />
                {form.formState.errors.email && (
                  <div className="text-sm text-red-600">
                    {form.formState.errors.email.message}
                  </div>
                )}
              </div>
              <div className="flex flex-col text-left space-y-1.5">
                <Label htmlFor="name">Senha</Label>
                <Input
                  placeholder="Entre com sua senha"
                  type="password"
                  {...form.register('password', {
                    required: {
                      value: true,
                      message: 'Senha é um campo obrigatório',
                    },
                    // Padrão para senha forte
                    // pattern: {
                    //   value: new RegExp(
                    //     '^(?=.*[A-Z])(?=.*[!@#$%^&*()_+]).{8,}$'
                    //   ),
                    //   message:
                    //     'Senha tem que ter 8 digitos, 1 maiuscula e 1 caracter especial',
                    // },
                  })}
                />
                {form.formState.errors.password && (
                  <div className="text-sm text-red-600">
                    {form.formState.errors.password.message}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Link
              to="/auth/sign-up"
              className={buttonVariants({
                variant: 'link',
                className: '-mx-4',
              })}
            >
              Não tenho conta
            </Link>
            <Button type="submit">
              {authLoading ? 'Carregando...' : 'Entrar'}
            </Button>
          </CardFooter>
        </form>
      </Card>

      {authError && (
        <Alert className="flex flex-col items-start mt-6" variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Erro</AlertTitle>
          <AlertDescription>{authError}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
