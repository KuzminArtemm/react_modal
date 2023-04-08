import { useEffect, useRef } from 'react';

export default function CommonForm({
  onSubmit,
  name = '',
  superability = '',
  avatar = ''
}) {
  const formRef = useRef(null);

  useEffect(() => {
    formRef.current.elements.name.value = name;
    formRef.current.elements.superability.value = superability;
    formRef.current.elements.avatar.value = avatar;
  }, []);
  return (
    <div className="d-flex flex-column align-items-center mt-4">
      <form ref={formRef} onSubmit={onSubmit}>
        <div className="mb-3">
          <input
            type="text"
            name="name"
            placeholder="name..."
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            name="superability"
            placeholder="superability..."
            class="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <div className="mb-2">
          <input
            type="text"
            name="avatar"
            placeholder="avatar..."
            class="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <div className="d-flex flex-column align-items-center">
          <button type="submit" class="btn btn-light my-3">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
