import Image from 'next/image';

interface ContactDetailProps {
  data: {
    id: string;
    img_url: string;
    name: string;
    email: string;
  };
  getAllContact: () => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export default function ContactDetail({ data, getAllContact, isLoading, setIsLoading }: ContactDetailProps) {
  // key={contact.id} id={contact.id} name={contact.name} img={contact.img_url} email={contact.email}
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const apiToken = process.env.NEXT_PUBLIC_API_TOKEN;

  const onDelete = async () => {
    setIsLoading(true);
    const response = await fetch(`${apiBaseUrl}/api/contacts/${data.id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    });
    setIsLoading(false);
    const result = await response.json();
    if (result.success) {
      getAllContact();
    }
  };

  return (
    <div className="flex justify-between items-center">
      <div className="flex">
        <Image height={60} src={data.img_url} alt={data.name} width={60} />
        <div className="items-start ml-3 flex flex-col justify-center">
          <p>{data.name}</p>
          <p>{data.email}</p>
        </div>
      </div>
      <div>
        <button className="bg-red-700 text-white px-3 py-1 rounded hover:bg-red-500 " type="submit" onClick={onDelete} disabled={isLoading}>
          x
        </button>
      </div>
    </div>
  );
}
