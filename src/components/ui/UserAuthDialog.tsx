
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { UserRound, LogOut } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  username: z.string().min(3, 'Имя пользователя должно быть не менее 3 символов')
});

export const UserAuthDialog = () => {
  const { user, isAuthenticated, login, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: ''
    }
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    login(values.username);
    setIsOpen(false);
    form.reset();
    
    toast({
      title: "Аккаунт создан",
      description: "Теперь вы можете отслеживать свой прогресс обучения",
      variant: "default",
    });
  };

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    toast({
      title: "Выход из аккаунта",
      description: "Вы успешно вышли из системы",
      variant: "default",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {isAuthenticated ? (
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-full"
          >
            <UserRound className="text-greek-darkBlue" />
          </Button>
        ) : (
          <Button 
            className="px-6 py-2 bg-greek-darkBlue text-white rounded-lg hover:bg-greek-blue transition-colors"
          >
            Создать аккаунт
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isAuthenticated ? 'Ваш профиль' : 'Вход в систему'}
          </DialogTitle>
        </DialogHeader>
        
        {isAuthenticated ? (
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="bg-greek-blue/20 text-greek-darkBlue p-3 rounded-full">
                <UserRound size={24} />
              </div>
              <div>
                <h3 className="font-medium text-lg">{user?.username}</h3>
                <p className="text-sm text-gray-500">Дата регистрации: {new Date(user?.createdAt || '').toLocaleDateString('ru-RU')}</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              className="w-full flex justify-center items-center gap-2"
              onClick={handleLogout}
            >
              <LogOut size={16} />
              Выйти из аккаунта
            </Button>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Имя пользователя</FormLabel>
                    <FormControl>
                      <Input placeholder="Введите ваше имя" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">Создать аккаунт</Button>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
};
