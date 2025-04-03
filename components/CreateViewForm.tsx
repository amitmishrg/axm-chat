'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

const formSchema = z.object({
  viewname: z.string().min(2, {
    message: 'Viewname must be at least 2 characters.',
  }),
  description: z.string().optional(),
});

export function CreateViewForm({
  onComplete,
}: {
  onComplete?: (values: z.infer<typeof formSchema>) => void;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      viewname: '',
      description: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { viewname, description } = values;

    try {
      onComplete({ viewname, description });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 bg-white shadow border rounded-md p-4"
      >
        <FormField
          control={form.control}
          name="viewname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>View Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter view name" {...field} />
              </FormControl>
              <FormDescription>Give this view a unique name</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter description"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
