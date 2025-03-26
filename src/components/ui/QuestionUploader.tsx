
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
import { Upload, Wand2 } from 'lucide-react';
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { generateQuestionContent } from "@/services/aiService";

const questionSchema = z.object({
  text: z.string().min(10, { message: "Текст вопроса должен содержать минимум 10 символов" }),
  category: z.enum(["history", "geography", "culture", "politics"], {
    required_error: "Пожалуйста, выберите категорию",
  }),
  type: z.enum(["multiple-choice", "open-ended"], {
    required_error: "Пожалуйста, выберите тип вопроса",
  }),
});

type QuestionFormValues = z.infer<typeof questionSchema>;

interface QuestionUploaderProps {
  onQuestionAdd: (question: any) => void;
  category?: 'history' | 'geography' | 'culture' | 'politics';
}

const QuestionUploader: React.FC<QuestionUploaderProps> = ({ onQuestionAdd, category }) => {
  const [open, setOpen] = useState(false);
  const [questionType, setQuestionType] = useState<'multiple-choice' | 'open-ended'>('multiple-choice');
  const [isGenerating, setIsGenerating] = useState(false);

  const form = useForm<QuestionFormValues>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      text: '',
      category: category || 'history',
      type: 'multiple-choice',
    },
  });

  const handleTypeChange = (type: 'multiple-choice' | 'open-ended') => {
    setQuestionType(type);
    form.setValue('type', type);
  };

  const onSubmit = async (values: QuestionFormValues) => {
    try {
      setIsGenerating(true);
      toast.info("Генерация вариантов ответа и объяснения...", {
        description: "Это может занять несколько секунд"
      });

      // Generate AI content
      const aiContent = await generateQuestionContent(
        values.text, 
        values.type, 
        values.category
      );

      // Process form data to create new question
      const newQuestion = {
        id: `custom-${Date.now()}`,
        category: values.category,
        text: values.text,
        type: values.type,
        explanation: aiContent.explanation,
      };

      // Add options for multiple choice questions
      if (values.type === 'multiple-choice' && aiContent.options) {
        (newQuestion as any).options = aiContent.options;
      } else if (aiContent.correctAnswer) {
        // For open-ended questions
        (newQuestion as any).correctAnswer = aiContent.correctAnswer;
      }

      // Add question
      onQuestionAdd(newQuestion);
      
      // Success message
      toast.success("Вопрос успешно добавлен", {
        description: "Варианты ответа и объяснение были сгенерированы автоматически"
      });
      
      // Reset form and close dialog
      form.reset();
      setOpen(false);
    } catch (error) {
      console.error("Error adding question:", error);
      toast.error("Ошибка при добавлении вопроса");
    } finally {
      setIsGenerating(false);
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
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Добавить новый вопрос</DialogTitle>
            <DialogDescription>
              Введите свой вопрос. Варианты ответа и объяснение будут сгенерированы автоматически.
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
                    <FormDescription>
                      Введите полный текст вопроса. ИИ автоматически сгенерирует варианты ответа и объяснение.
                    </FormDescription>
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
                    <FormDescription>
                      ИИ сгенерирует {questionType === 'multiple-choice' ? 'варианты ответа' : 'примерный правильный ответ'} в зависимости от выбранного типа.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                  Отмена
                </Button>
                <Button 
                  type="submit" 
                  disabled={isGenerating}
                  className="gap-2"
                >
                  {isGenerating && (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  )}
                  {isGenerating ? "Генерация..." : "Добавить вопрос"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default QuestionUploader;
