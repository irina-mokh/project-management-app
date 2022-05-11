import './newBoardModal.scss';
import { useForm } from 'react-hook-form';

export function NewBoardModal() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <div className="modal-overlay">
      <div className="modal-content-wrapper">
        <form onSubmit={onSubmit} data-testid="newBoardModal">
          <h3>Name your board</h3>
          <input {...register('newBoardName', { required: true, minLength: 2 })} />
          {errors.newBoardName && 'Enter board name'}

          <label>
            Upload your cover
            <input type="file" accept="image/*" {...register('newBoardCover')} />
          </label>

          <label>
            add a user to team
            <input type="button" {...register('addTeamMember')}></input>
          </label>

          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
}
