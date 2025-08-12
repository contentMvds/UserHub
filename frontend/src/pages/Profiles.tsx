import React, { useEffect, useState } from 'react';

interface Props {
  token: string;
}

interface Profile {
  id: string;
  name: string;
}

export default function Profiles({ token }: Props) {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [name, setName] = useState('');

  const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` };

  const load = async () => {
    const res = await fetch('/api/profiles', { headers: { Authorization: `Bearer ${token}` } });
    if (res.ok) setProfiles(await res.json());
  };

  useEffect(() => { load(); }, []);

  const create = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/profiles', {
      method: 'POST',
      headers,
      body: JSON.stringify({ name })
    });
    setName('');
    load();
  };

  const remove = async (id: string) => {
    await fetch(`/api/profiles/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
    load();
  };

  return (

    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Perfis</h2>
      <ul className="mb-4 space-y-1">
        {profiles.map((p) => (
          <li key={p.id} className="flex justify-between border-b py-1">
            <span>{p.name}</span>
            <button className="text-red-500" onClick={() => remove(p.id)}>Excluir</button>
          </li>
        ))}
      </ul>
      <form onSubmit={create} className="space-y-2">
        <input
          className="w-full border p-2"

          placeholder="nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit" className="bg-blue-500 text-white px-2 py-1 rounded">Adicionar</button>
      </form>
    </div>
  );
}
