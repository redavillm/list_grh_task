import { meterStore } from '../stores/MeterStore';

interface IDeleteBtn {
  id: string;
}

export const DeleteBtn = (props: IDeleteBtn) => {
  const { id } = props;
  const handleDelete = async (id: string) => {
    await meterStore.deleteMeter(id);
  };

  return (
    <button onClick={() => handleDelete(id)}>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M7.33334 6.00002V12H6.00001V6.00002H7.33334Z" fill="#C53030" />
        <path d="M10 6.00002V12H8.66668V6.00002H10Z" fill="#C53030" />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M4.85284 0.666687H11.1472L11.8139 2.66669H14.6667V4.00002H13.3333L12.6667 15.3334H3.33334L2.66668 4.00002H1.33334V2.66669H4.18617L4.85284 0.666687ZM5.59163 2.66669H10.4084L10.1862 2.00002H5.81385L5.59163 2.66669ZM4.00001 4.00002L4.66668 14H11.3333L12 4.00002H4.00001Z"
          fill="#C53030"
        />
      </svg>
    </button>
  );
};
