'use client';

import * as z from 'zod';
import Heading from '@/components/heading';
import { useForm } from 'react-hook-form';
import { formSchema } from './constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Empty } from '@/components/empty';
import { Loader } from '@/components/loader';
import { musicDetails } from '@/app/routes';
import { VolumeX } from 'lucide-react';
import { useProModal } from '@/hooks/use-pro-model';
import toast from 'react-hot-toast';

const MusicPage = () => {
  const proModal = useProModal();
  const router = useRouter();
  const [music, setMusic] = useState<string>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
    },
  });

  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setMusic(undefined);
    try {
      const response = await fetch('/api/music', {
        body: JSON.stringify(values),
        method: 'POST',
      });

      if(response.status === 403) {
        proModal.onOpen();
      }

      const data = await response.json();
      setMusic(data.audio);

      form.reset();
    } catch (error: any) {
      console.log(error)
      toast.error('Failed to generate response');
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <Heading
        title={musicDetails.label}
        description={musicDetails.description}
        icon={musicDetails.icon}
        iconColor={musicDetails.color}
        bgColor={musicDetails.bgColor}
      />
      <div className='px-4 lg:px-8'>
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2'
            >
              <FormField
                name='prompt'
                render={({ field }) => (
                  <FormItem className='col-span-12 lg:col-span-10'>
                    <FormControl className='m-0 p-0'>
                      <Input
                        className='border-0 outline-0 focus-visible:ring-0 focus-visible:ring-transparent'
                        disabled={isLoading}
                        placeholder='Piano solo'
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                className='col-span-12 lg:col-span-2 w-full'
                disabled={isLoading}
              >
                Generate
              </Button>
            </form>
          </Form>
        </div>
        <div className='space-y-4 mt-4'>
          {isLoading && (
            <div className='p-8 rounded-lg 2-full flex items-center justify-center bg-muted'>
              <Loader />
            </div>
          )}
          {!music && !isLoading && (
            <Empty icon={VolumeX} label='No music generated' />
          )}
          {music && (
            <audio controls className='w-full mt-8'>
              <source src={music} />
            </audio>
          )}
        </div>
      </div>
    </div>
  );
};

export default MusicPage;
