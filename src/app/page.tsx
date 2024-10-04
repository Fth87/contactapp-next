/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import Input from '../component/Input';
import Button from '../component/Button';
import ContactDetail from '../component/ContactDetail';
import { useEffect, useState } from 'react';
import Loading from '../component/loading/Loading';

function App() {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const apiToken = process.env.NEXT_PUBLIC_API_TOKEN;

  const [isLoading, setIsLoading] = useState(false);
  const [getContacts, setGetContacts] = useState([{ id: '', name: '', img_url: '', email: '' }]);

  const getAllContacts = async () => {
    setIsLoading(true);
    const res = await fetch(apiBaseUrl + '/api/contacts', {
      headers: {
        authorization: `Bearer ${apiToken}`,
      },
    }).then((response) => response.json());

    setGetContacts(res.data);
    setIsLoading(false);
  };

  const onAddContact = async ({ name, email }: { name: string; email: string }): Promise<void> => {
    const payload = {
      name,
      email,
      img_url: `https://dummyjson.com/icon/${encodeURIComponent(name)}/128`,
    };

    const res = await fetch(apiBaseUrl + '/api/contacts/new', {
      method: 'POST',
      headers: {
        authorization: `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();
    if (result.success) {
      getAllContacts();
    }
  };

  useEffect(() => {
    getAllContacts();
    if (!isLoading) {
      setName('');
      setEmail('');
    }
  }, [setIsLoading]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const onSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await onAddContact({ name, email });
    setName('');
    setEmail('');
    setIsLoading(false);
  };

  return (
    <>
      <main className="container max-w-[500px] bg-white rounded shadow-md mx-auto mt-[100px] p-8">
        <h1 className="text-center text-2xl font-bold py-5">Contact App</h1>
        <form id="contact_form" className="flex flex-col gap-3" onSubmit={onSubmitForm}>
          <Input type="text" name="name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <Input type="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Button onClick={() => {}} text={'submit'} type="submit" disable={isLoading} />
        </form>
        <section className="">
          <h2 className="text-center text-xl font-bold my-5">contact list</h2>
          <div id="contact_list" className="flex flex-col gap-3">
            {!isLoading ? (
              getContacts.map((contact) => <ContactDetail key={contact.id} data={contact} getAllContact={getAllContacts} isLoading={isLoading} setIsLoading={setIsLoading} />)
            ) : (
              <div className="loader-container">
                <Loading />
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
