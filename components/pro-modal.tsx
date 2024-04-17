'use client';

import { useProModal } from '@/hooks/use-pro-model';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Badge } from './ui/badge';
import { tools } from '@/app/routes';
import { Card } from './ui/card';
import { cn } from '@/lib/utils';
import { Check, Zap } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';

export const ProModal = () => {
  const proModal = useProModal();
  const [ loading, setLoading ] = useState(false);

  const onSubscribe = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/stripe', {
        method: 'GET',
      })

      const result = await response.json();
      window.location.href = result.url;
    } catch (error) {
      console.log(error, 'STRIPE_CLIENT_ERROR')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
            <div className="flex items-center gap-x-2 font-bold py-1">
              Upgrade plan
              <Badge className="uppercase text-sm py-1" variant='premium'>
                pro
              </Badge>
            </div>
          </DialogTitle>
          <DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 font-medium">
            {tools.map(tool => (
              <Card 
                key={tool.href}
                className="p-3 border-black/5 flex items-center justify-between"
              >
                <div className="flex items-center gap-x-4">
                  <div className={cn('p-2 w-ft rounded-md', tool.bgColor)}>
                    <tool.icon className={cn('w-6 h-6', tool.color)} />
                  </div>
                  <div className="font-semibold text-sm">
                    {tool.label}
                  </div>
                  <Check className="text-primary w-5 h-5"/>
                </div>
              </Card>
            ))}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
              <Button 
                disabled={loading}
                onClick={onSubscribe}
                size='lg' 
                variant='premium'
                className="w-full"
              >
                Upgrade 
                <Zap className="w-4 h-4 ml-2 fill-white"/>
              </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
};
