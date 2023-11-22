import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Icons } from '@/components/icons';
import QRCode from 'react-qr-code';

type ConnectDeviceDialogProps = {
  child: ChildModel;
};

const ConnectDeviceDialog: React.FC<ConnectDeviceDialogProps> = ({ child }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Icons.connect className="mr-2 h-4 w-4" /> Connect device
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] ">
        <DialogHeader>
          <DialogTitle>Connect new device</DialogTitle>
          <DialogDescription>
            {`Scan this barcode on ${child.name}'s device`}
          </DialogDescription>
        </DialogHeader>
        <div className="bg-slate-300 ">
          <div className="p-4 border-8 border-slate-200">
            <QRCode
              size={190}
              style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
              value={child.id}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Done</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConnectDeviceDialog;
