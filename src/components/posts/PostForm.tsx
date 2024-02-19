'use client';

import { toast } from 'react-toastify';

/* hooks */
import { useFormState } from 'react-dom';
import { useEffect, useState } from 'react';

/* actions */
import * as actions from '@/actions';

/* components */
import FormButtonPrimary from '@/components/auth/FormButtonPrimary';
import Input from '../common/Input';
import Textarea from '../common/Textarea';
import Dialog from '../common/Dialog';

export default function PostForm() {
  const [formState, action] = useFormState(actions.createPost, { errors: {} });
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  useEffect(() => {
    if (formState.success) {
      toast.success('Post successfully created!');
      setOpenDialog(false);
    }
  }, [formState.success]);

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  return (
    <form action={action}>
      <FormButtonPrimary
        onClick={handleDialogOpen}
        type="button"
        className="post-btn"
      >
        CREATE A POST
      </FormButtonPrimary>

      <Dialog
        handleDialogClose={handleDialogClose}
        className="post_dialog bg-zinc-800 rounded-xl transition-all backdrop:bg-black backdrop:opacity-80"
        isOpen={openDialog}
      >
        <div className="flex flex-col justify-center m-auto w-[clamp(200px,_50%+20px,_800px)] h-full text-white">
          <Input
            classWrapper="text-xl"
            type="text"
            name="title"
            label="Title"
            errors={formState.errors.title}
          />
          <Textarea
            classWrapper="text-xl"
            name="content"
            label="Content"
            errors={formState.errors.content}
          />

          <FormButtonPrimary
            type="submit"
            className="post_dialog-btn self-center"
          >
            CREATE A POST
          </FormButtonPrimary>
        </div>
      </Dialog>
    </form>
  );
}
