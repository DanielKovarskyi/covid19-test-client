import React from 'react';
import { mount } from 'enzyme';
import { TextField, Grid, Button, Table } from '@material-ui/core';
import Form from './index';

describe('Form test', () => {
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
});
