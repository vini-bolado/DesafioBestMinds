import axios from "axios";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 120px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: green;
  color: white;
  height: 42px;
`;

const Form = ({ getProducts, onEdit, setOnEdit }) => {
  const [formData, setFormData] = useState({
    name: "",
    codigo: "",
    descricao: "",
    preco: "",
  });

  useEffect(() => {
    if (onEdit) {

      setFormData({
        name: onEdit.name,
        codigo: onEdit.codigo,
        descricao: onEdit.descricao,
        preco: onEdit.preco,
      });
    }
  }, [onEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validar a entrada com base no nome do campo
    if (name === "name" || name === "descricao") {
      // Não permitir números no nome e descrição
      if (/\d/.test(value)) {
        return;
      }
    } else if (name === "preco" || name === "codigo") {
      // Não permitir letras no preço
      if (/[a-zA-Z]/.test(value)) {
        return;
      }
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };



  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (!formData.name || !formData.codigo || !formData.descricao || !formData.preco) {
  //     return toast.warn("Preencha todos os campos!");
  //   }


  //   if (onEdit) {
  //     await axios.put(`http://localhost:8800/${onEdit.id}`, formData);
  //     toast.success("Produto atualizado com sucesso!");
  //   } else {
  //     await axios.post("http://localhost:8800", formData);
  //     toast.success("Produto criado com sucesso!");
  //   }

  //   setFormData({
  //     name: "",
  //     codigo: "",
  //     descricao: "",
  //     preco: "",
  //   });

  //   setOnEdit(null);
  //   getProducts();

  // };



  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.codigo || !formData.descricao || !formData.preco) {
      return toast.warn("Preencha todos os campos!");
    }

    try {
      if (onEdit) {

        await axios.put(`http://localhost:8800/${onEdit._id}`, formData);
        toast.success("Produto atualizado com sucesso!");
      } else {
        await axios.post("http://localhost:8800", formData);
        toast.success("Produto criado com sucesso!");
      }

      setFormData({
        name: "",
        codigo: "",
        descricao: "",
        preco: "",
      });

      setOnEdit(null);
      getProducts();
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
      toast.error("Erro ao salvar produto. Tente novamente mais tarde.");
    }
  };




  return (
    <FormContainer onSubmit={handleSubmit}>
      <InputArea>
        <Label>Nome</Label>
        <Input
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </InputArea>
      <InputArea>
        <Label>Código</Label>
        <Input
          name="codigo"
          value={formData.codigo}
          onChange={handleChange}
        />
      </InputArea>
      <InputArea>
        <Label>Descrição</Label>
        <Input
          name="descricao"
          value={formData.descricao}
          onChange={handleChange}
        />
      </InputArea>
      <InputArea>
        <Label>Preço</Label>
        <Input
          name="preco"
          value={formData.preco}
          onChange={handleChange}
        />
      </InputArea>

      <Button type="submit">SALVAR</Button>
    </FormContainer>
  );
};

export default Form;
