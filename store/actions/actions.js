import gasTank from '../../models/GT'
import Order from '../../models/Order'

export const createOrder = (gasname,gastype,litre,price,progress) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://domlet-17cc6-default-rtdb.firebaseio.com/Orders.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          gasname,
          gastype,
          litre,
          price,
          progress
        }),
      },
    );
    if (!response.ok) {
      throw new Error('Something wrong');
    }
    const resData = await response.json();
  };
}

export const editGasTank = (gasname,availability,id) => {
  console.log(id);
  return async (dispatch) => {
    const response = await fetch(
      `https://domlet-17cc6-default-rtdb.firebaseio.com/gasTanks/${id}.json`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          gasname,
          availability,
        }),
      },
    );
    if (!response.ok) {
      throw new Error('Something wrong');
    }
    dispatch({
      type: 'UPDATE',
      payload: {
        id: id,
       gasname: gasname,
        availability:availability,
      },
    });
  };
};

export const showAll = () => {
    return async (dispatch) => {
      const response = await fetch(
        'https://domlet-17cc6-default-rtdb.firebaseio.com/gasTanks.json',
      );
      if (!response.ok) {
        throw new Error('Something wrong');
      }
      const resData = await response.json();
      const fetchItemsList = [];
      for (const i in resData) {
        if (resData[i].availability == "Available")
        {
        fetchItemsList.push(
          new gasTank(i, resData[i].gasname, resData[i].availability),
        );}}
     dispatch({
        type: 'SHOW_ALL',
        payload: {
          gasTanks: fetchItemsList
        },
      });
      
    };
  }

  export const addGas = (gasname,availability) => {
    return async (dispatch) => {
      const response = await fetch(
        `https://domlet-17cc6-default-rtdb.firebaseio.com/gasTanks.json`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            gasname,
            availability 
          }),
        },
      );
      if (!response.ok) {
        throw new Error('Something wrong');
      }
      const resData = await response.json();
     dispatch({
        type: 'ADD_GAS',
        payload: {
          id: resData.name,
          gasname: gasname,
          availability:availability
        },
      });
    };
  }