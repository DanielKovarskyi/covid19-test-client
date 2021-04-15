import React from 'react';
import { mount } from 'enzyme';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { act } from 'react-dom/test-utils';
import { TextField, Grid, Button, Table, TableRow } from '@material-ui/core';
import Form from './index';

describe('Form test', () => {
  const mock = new MockAdapter(axios);
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<Form />);
  });

  it('should contain proper components', () => {
    expect(wrapper.find(TextField).length).toEqual(5);
    expect(wrapper.find(Grid).length).toEqual(7);
    expect(wrapper.find(Button).length).toEqual(1);
    // no submit - no Table
    expect(wrapper.find(Table).length).toEqual(0);
  });

  it('should add Table and TableRow on submit', async () => {
    mock.onPost('http://localhost:3001/qrcode').reply(200, {
      first_name: 'abc',
      last_name: 'def',
      birth_date: '01/01/2001',
      phone: '322223',
      email: 'abc@abc.com',
    });

    const form = wrapper.find('form');

    // add one result
    await act(async () => {
      await form.simulate('submit');
    });

    wrapper.update();

    expect(wrapper.find(Table).length).toEqual(2);
    expect(wrapper.find(TableRow).length).toEqual(9);

    // add two results
    await act(async () => {
      await form.simulate('submit');
    });

    wrapper.update();

    expect(wrapper.find(Table).length).toEqual(3);
    expect(wrapper.find(TableRow).length).toEqual(17);
  });
});
