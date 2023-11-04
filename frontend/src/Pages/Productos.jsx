import React, { useEffect, useState, useRef } from 'react';

export const Producto = () => {
  const ENDPOINT = "http://localhost:4000/productos"; // Cambia la URL según tu servidor de productos.

  const [productos, setProductos] = useState([]);
  const dialogRef = useRef(null);
  const dialogDeleteRef = useRef(null);
  const [currentProducto, setCurrentProducto] = useState({
    id: 0,
    nombre: '',
    precio: '',
    codigo: '',
    existencia: '',
  });

  const getAll = async () => {
    let fetchResp = await fetch(ENDPOINT);
    let dataJson = await fetchResp.json();
    setProductos(dataJson);
  };

  useEffect(() => {
    (async () => {
      await getAll();
    })();
  }, []);

  const newProductoClick = (e) => {
    e.preventDefault();
    dialogRef.current.showModal();
  };

  const closeNewProductoModal = (e) => {
    e.preventDefault();
    dialogRef.current.close();
  };

  const valueHasChanged = (e) => {
    setCurrentProducto({
      ...currentProducto,
      [e.target.name]: e.target.value,
    });
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    if (currentProducto.id <= 0) {
      // Create
      await postData(currentProducto);
    } else {
      await updateData(currentProducto);
    }
    setCurrentProducto({
      id: 0,
      nombre: '',
      precio: '',
      codigo: '',
      existencia: '',
    });
    dialogRef.current.close();
  };

  const postData = async (data) => {
    let fetchResp = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    let json = await fetchResp.json();
    await getAll();
  };

  const updateData = async (data) => {
    let fetchResp = await fetch(ENDPOINT + "/" + data.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    let json = await fetchResp.json();
    await getAll();
  };

  const deleteRow = async (row) => {
    setCurrentProducto(row);
    dialogDeleteRef.current.showModal();
  };

  const deleteData = async (row) => {
    let fetchResp = await fetch(ENDPOINT + "/" + row.id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });
    let json = await fetchResp.json();
    await getAll();
  };

  const confirmDelete = async (e) => {
    e.preventDefault();
    await deleteData(currentProducto);
    dialogDeleteRef.current.close();
  };

  const showEdit = (row) => {
    setCurrentProducto(row);
    dialogRef.current.showModal();
  };

  return (
    <>
      {}
    </>
  );
};
