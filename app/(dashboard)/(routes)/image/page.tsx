'use client';

import * as z from 'zod';
import Heading from '@/components/heading';
import { useForm } from 'react-hook-form';
import { amountOptions, formSchema, resolutionOptions } from './constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Empty } from '@/components/empty';
import { Loader } from '@/components/loader';
import { cn } from '@/lib/utils';
import { BotAvatar } from '@/components/bot-avatar';
import { UserAvatar } from '@/components/user-avatar';
import { imageDetails } from '@/app/routes';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardFooter } from '@/components/ui/card';
import Image from 'next/image';
import { Download } from 'lucide-react';

const ImagePage = () => {
  const router = useRouter();
  const [images, setImages] = useState<string[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
      amount: '1',
      resolution: '512x512',
    },
  });

  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setImages([])

      const response = await fetch('/api/image', {
        body: JSON.stringify({ values }),
        method: 'POST',
      });

      const data = await response.json();
      setImages(data)

      form.reset();
    } catch (error) {
      console.log(error);
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <Heading
        title={imageDetails.label}
        description={imageDetails.description}
        icon={imageDetails.icon}
        iconColor={imageDetails.color}
        bgColor={imageDetails.bgColor}
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
                  <FormItem className='col-span-12 lg:col-span-6'>
                    <FormControl className='m-0 p-0'>
                      <Input
                        className='border-0 outline-0 focus-visible:ring-0 focus-visible:ring-transparent'
                        disabled={isLoading}
                        placeholder='A picture of a dog walking'
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField 
                control={form.control}
                name='amount'
                render={({ field }) => (
                  <FormItem className='col-span-12 lg:col-span-2'>
                    <Select 
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {amountOptions.map(option => (
                          <SelectItem
                            key={option.value}
                            value={option.value}
                          >
                            {option.value} photos
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField 
                control={form.control}
                name='resolution'
                render={({ field }) => (
                  <FormItem className='col-span-12 lg:col-span-2'>
                    <Select 
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {resolutionOptions.map(option => (
                          <SelectItem
                            key={option.index}
                            value={option.label}
                          >
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
          {images.length === 0 && !isLoading && (
            <Empty label='No images generated' />
          )}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8'>
            {images.map(src => (
              <Card
                key={src}
                className='rounded-lg overflow-hidden'
              >
                <div className='relative aspect-square'>
                  <Image 
                    alt='Image'
                    fill
                    src={src}
                  />
                </div>
                <CardFooter className='p-2'>
                  <Button 
                    onClick={() => window.open(src)}
                    variant='secondary' 
                    className='w-full'
                  >
                    <Download className='h-4 w-4 mr-2'/>
                    Download
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImagePage;
