import React, { useEffect, useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/outline';
import './App.css';
import { getUsers } from './api/index';
import User from './models/User';

var prevId = 0;
function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState('');
  const [moreDetails, setMoreDetails] = useState(0);

  useEffect(() => {
    getUsers().then(res => setUsers(res));
  }, [])

  function selectedUser(id: number) {
    if (id !== prevId) {
      prevId = id;
      setMoreDetails(id);
    } else {
      setMoreDetails(0);
      prevId = 0;
    }
  }

  return (
    <div className="w-screen space-x-2 text-xs">
      <input value={search} onChange={(e) => setSearch(e.target.value)} className='p-3 border-2 border-blue-300 opacity-50 m-2 outline-none focus:opacity-70' placeholder="Search" />
      <div className='grid grid-cols-7 gap-2 my-5 text-blue-500 font-bold p-2'>
        <div>Name</div>
        <div>Username</div>
        <div>Phone</div>
        <div>Email</div>
        <div>Website</div>
        <div>Address</div>
        <div>Company</div>
      </div>
      {
        users?.length > 0 && users?.filter(u =>
          u.name.toLowerCase().includes(search.toLowerCase())
          || u.username.toLowerCase().includes(search.toLowerCase())
          || u.email.toLowerCase().includes(search.toLowerCase())
          || u.website.toLowerCase().includes(search.toLowerCase())
          || u.phone.toLowerCase().includes(search.toLowerCase())
          || u.address.city.toLowerCase().includes(search.toLowerCase())
          || u.company.name.toLowerCase().includes(search.toLowerCase())
        ).map((user) => (
          <div data-testid="user-rows" onClick={() => selectedUser(user.id)} key={user.id} className={'grid grid-cols-7 gap-1 cursor-pointer p-2'}>
            <div className='flex'>
              {user.name}</div>
            <div className='line-clamp-4'>{user.username}</div>
            <div className='line-clamp-4 truncate'>{user.phone}</div>
            <div className='line-clamp-4'>
              {user.email}</div>
            <div className='line-clamp-4'>{user.website}</div>
            <div className='line-clamp-4'>
              <div className='flex justify-between'>
                <div>{user.address.city} &nbsp;</div>
                {moreDetails > 0 && moreDetails === user.id ? <ChevronDownIcon className='h-3 mt-1 pr-10' /> : <ChevronUpIcon className='h-3 mt-1 pr-10' />}
              </div>

              <div className={(moreDetails === user.id ? 'flex flex-col' : 'hidden')}>
                <div>{user.address.street}</div>
                <div>{user.address.suite}</div>
                <div>{user.address.zipcode}</div>
                <div className='pt-2'>
                  <span className=''>Geo:</span>
                  <div>
                    lat: {user.address.geo.lat}
                  </div>
                  <div>
                    lng: {user.address.geo.lng}
                  </div>
                </div>
              </div>
            </div>
            <div className='line-clamp-4'>
              <div className='flex justify-between'>
                <div>{user.company.name} &nbsp;</div>
                {moreDetails > 0 && moreDetails === user.id ? <ChevronDownIcon className='h-3 mt-1 pr-5' /> : <ChevronUpIcon className='h-3 mt-1 pr-5' />}
              </div>
              <div className={'pt-2 space-y-2 ' + (moreDetails === user.id ? 'flex flex-col' : 'hidden')}>
                <div>Catchphrase: <div>
                  {user.company.catchPhrase}
                </div></div>
                <div>bs: <div>{user.company.bs}</div></div>
              </div>
            </div>
          </div>

        ))
      }
    </div>
  );
}

export default App;
