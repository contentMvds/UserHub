import React, { useEffect, useState } from 'react';

interface Props {
  token: string;
}

interface User {
  id: string;
  email: string;
  profileId: string;
}

export default function Users({ token }: Props) {
  const [users, setUsers] = useState<User[]>([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profileId, setProfileId] = useState('');

  const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` };

  const load = async () => {
    const res = await fetch('/api/users', { headers: { Authorization: `Bearer ${token}` } });
    if (res.ok) setUsers(await res.json());
  };

  useEffect(() => { load(); }, []);

  const create = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/users', {
      method: 'POST',
      headers,
      body: JSON.stringify({ email, password, profileId })
    });
    setEmail('');
    setPassword('');
    setProfileId('');
    load();
  };

  const remove = async (id: string) => {
    await fetch(`/api/users/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
    load();
  };

  return (

    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Usuários</h2>
      <ul className="mb-4 space-y-1">
        {users.map((u) => (
          <li key={u.id} className="flex justify-between border-b py-1">
            <span>{u.email} (perfil: {u.profileId})</span>
            <button className="text-red-500" onClick={() => remove(u.id)}>Excluir</button>
          </li>
        ))}
      </ul>
      <form onSubmit={create} className="space-y-2">
        <input
          className="w-full border p-2"

          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full border p-2"

          type="password"
          placeholder="senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          className="w-full border p-2"
          placeholder="profileId"
          value={profileId}
          onChange={(e) => setProfileId(e.target.value)}
        />
        <button type="submit" className="bg-blue-500 text-white px-2 py-1 rounded">Adicionar</button>
      </form>
    </div>
  );
}
