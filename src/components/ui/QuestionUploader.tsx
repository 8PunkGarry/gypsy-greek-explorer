
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Upload } from 'lucide-react';
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const questionSchema = z.object({
  text: z.string().min(10, { message: "Текст вопроса должен содержать минимум 10 символов" }),
  category: z.enum(["history", "geography", "culture", "politics"], {
    required_error: "Пожалуйста, выберите категорию",
  }),
  type: z.enum(["multiple-choice", "open-ended"], {
    required_error: "Пожалуйста, выберите тип вопроса",
  }),
  options: z.array(z.object({
    text: z.string(),
    isCorrect: z.boolean(),
  })).optional(),
  correctAnswer: z.string().optional(),
  explanation: z.string().min(10, { message: "Объяснение должно содержать минимум 10 символов" }),
});

type QuestionFormValues = z.infer<typeof questionSchema>;

interface QuestionUploaderProps {
  onQuestionAdd: (question: any) => void;
  category?: 'history' | 'geography' | 'culture' | 'politics';
}

const QuestionUploader: React.FC<QuestionUploaderProps> = ({ onQuestionAdd, category }) => {
  const [open, setOpen] = useState(false);
  const [questionType, setQuestionType] = useState<'multiple-choice' | 'open-ended'>('multiple-choice');
  const [options, setOptions] = useState([
    { id: '1', text: '', isCorrect: true },
    { id: '2', text: '', isCorrect: false },
    { id: '3', text: '', isCorrect: false },
    { id: '4', text: '', isCorrect: false },
  ]);

  const form = useForm<QuestionFormValues>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      text: '',
      category: category || 'history',
      type: 'multiple-choice',
      explanation: '',
    },
  });

  const handleAddOption = () => {
    if (options.length < 6) {
      setOptions([...options, { id: `${options.length + 1}`, text: '', isCorrect: false }]);
    }
  };

  const handleRemoveOption = (id: string) => {
    if (options.length > 2) {
      const newOptions = options.filter(option => option.id !== id);
      // Ensure at least one option is marked as correct
      const hasCorrectOption = newOptions.some(opt => opt.isCorrect);
      
      if (!hasCorrectOption) {
        newOptions[0].isCorrect = true;
      }
      
      setOptions(newOptions);
    } else {
      toast.error("Минимум два варианта ответа");
    }
  };

  const handleOptionChange = (id: string, text: string) => {
    setOptions(
      options.map(option => 
        option.id === id ? { ...option, text } : option
      )
    );
  };

  const handleCorrectOptionChange = (id: string) => {
    setOptions(
      options.map(option => ({
        ...option,
        isCorrect: option.id === id
      }))
    );
  };

  const handleTypeChange = (type: 'multiple-choice' | 'open-ended') => {
    setQuestionType(type);
    form.setValue('type', type);
  };

  const onSubmit = (values: QuestionFormValues) => {
    try {
      // Process form data to create new question
      const newQuestion = {
        id: `custom-${Date.now()}`,
        category: values.category,
        text: values.text,
        type: values.type,
        explanation: values.explanation,
      };

      // Add options for multiple choice questions
      if (values.type === 'multiple-choice') {
        const processedOptions = options.map(opt => ({
          id: opt.id,
          text: opt.text,
          isCorrect: opt.isCorrect
        }));
        
        // Validate that all options have text
        const emptyOptions = processedOptions.filter(opt => !opt.text.trim());
        if (emptyOptions.length > 0) {
          toast.error("Все варианты ответов должны содержать текст");
          return;
        }
        
        // Add options to question
        (newQuestion as any).options = processedOptions;
      } else {
        // For open-ended questions
        (newQuestion as any).correctAnswer = values.correctAnswer || "Это открытый вопрос без единственного правильного ответа.";
      }

      // Add question
      onQuestionAdd(newQuestion);
      
      // Success message
      toast.success("Вопрос успешно добавлен");
      
      // Reset form and close dialog
      form.reset();
      setOpen(false);
    } catch (error) {
      console.error("Error adding question:", error);
      toast.error("Ошибка при добавлении вопроса");
    }
  };

  return (
    <>
      <Button 
        variant="outline" 
        onClick={() => setOpen(true)}
        className="flex items-center gap-2"
      >
        <Upload className="h-4 w-4" />
        Добавить свой вопрос
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Добавить новый вопрос</DialogTitle>
            <DialogDescription>
              Заполните форму ниже, чтобы добавить свой вопрос в симуляцию собеседования.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="text"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Текст вопроса</FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder="Введите ваш вопрос" className="min-h-20" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Категория</FormLabel>
                    <FormControl>
                      <select
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        {...field}
                        disabled={category !== undefined}
                      >
                        <option value="history">История</option>
                        <option value="geography">География</option>
                        <option value="culture">Культура</option>
                        <option value="politics">Политика</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Тип вопроса</FormLabel>
                    <div className="flex space-x-4">
                      <Button 
                        type="button"
                        variant={questionType === 'multiple-choice' ? 'default' : 'outline'}
                        onClick={() => handleTypeChange('multiple-choice')}
                        className="flex-1"
                      >
                        С вариантами ответа
                      </Button>
                      <Button 
                        type="button"
                        variant={questionType === 'open-ended' ? 'default' : 'outline'}
                        onClick={() => handleTypeChange('open-ended')}
                        className="flex-1"
                      >
                        Открытый вопрос
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {questionType === 'multiple-choice' ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <FormLabel>Варианты ответов</FormLabel>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      onClick={handleAddOption}
                      disabled={options.length >= 6}
                    >
                      Добавить вариант
                    </Button>
                  </div>
                  {options.map((option) => (
                    <div key={option.id} className="flex items-center space-x-2">
                      <div className="flex-1">
                        <Input
                          placeholder={`Вариант ${option.id}`}
                          value={option.text}
                          onChange={(e) => handleOptionChange(option.id, e.target.value)}
                          className="w-full"
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="radio"
                            name="correctOption"
                            checked={option.isCorrect}
                            onChange={() => handleCorrectOptionChange(option.id)}
                            className="rounded-full h-4 w-4 border-gray-300 text-greek-blue focus:ring-greek-blue"
                          />
                          <span className="text-sm">Верный</span>
                        </label>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveOption(option.id)}
                          disabled={options.length <= 2}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          Удалить
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <FormField
                  control={form.control}
                  name="correctAnswer"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Примерный правильный ответ (опционально)</FormLabel>
                      <FormControl>
                        <Textarea {...field} placeholder="Введите примерный правильный ответ или оставьте пустым" className="min-h-20" />
                      </FormControl>
                      <FormDescription>
                        Эта информация будет использоваться в объяснении после ответа.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="explanation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Объяснение</FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder="Напишите объяснение для этого вопроса" className="min-h-20" />
                    </FormControl>
                    <FormDescription>
                      Объяснение будет показано пользователю после ответа на вопрос.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                  Отмена
                </Button>
                <Button type="submit">Добавить вопрос</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default QuestionUploader;
