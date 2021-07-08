import React from 'react';
import { render, waitFor } from '@testing-library/react';
import App from './App';
import axios from 'axios';
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

//I Couldn't get the test to work, needed more time. 
it("fetches and displays users", async () => {
  const data = [{
          address: {street: "Kulas Light", suite: "Apt. 556", city: "Gwenborough", zipcode: "92998-3874", geo: {lat: "-37.3159",
          lng: "81.1496"}},
          company: {name: "Romaguera-Crona", catchPhrase: "Multi-layered client-server neural-net", bs: "harness real-time e-markets"},
          email: "Sincere@april.biz",
          id: 1,
          name: "Leanne Graham",
          phone: "1-770-736-8031 x56442",
          username: "Bret",
          website: "hildegard.org"
        }];
  mockedAxios.get.mockRejectedValue(data)
  expect(mockedAxios.get).toHaveBeenCalledTimes(1);
  const {getByTestId} = render(<App/>);
  const renderElement = await waitFor(() => getByTestId('user-rows'))
  expect(renderElement).toBeInTheDocument();
})

