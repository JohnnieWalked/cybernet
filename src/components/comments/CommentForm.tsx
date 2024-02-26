'use client';

/* hooks */
import { useFormState } from 'react-dom';

/* actions */
import * as actions from '@/actions';

/* components */
import Input from '../common/Input';
import Textarea from '../common/Textarea';
import FormButtonPrimary from '../auth/FormButtonPrimary';

type CommentFormProps = {
  postID: string;
  parentID?: string;
};

function CommentForm({ postID, parentID }: CommentFormProps) {
  const [formState, action] = useFormState(
    actions.createComment.bind(null, { postID, parentID }),
    {
      errors: {},
    }
  );

  return (
    <form className="flex flex-col w-[70%]" action={action}>
      <Textarea
        classTextArea="min-h-max"
        classLabel="left-1/2 -translate-x-1/2 text-center"
        name="content"
        label="Leave a comment"
        // type="text"
        errors={formState.errors.content}
      />

      {formState.errors._form ? (
        <div className=" bg-red-900 border rounded border-red-500 mt-2 p-2 text-red-300">
          {formState.errors._form.join(', ')}
        </div>
      ) : null}

      <FormButtonPrimary className="flex self-center" type="submit">
        Submit
      </FormButtonPrimary>
    </form>
  );
}

export default CommentForm;
