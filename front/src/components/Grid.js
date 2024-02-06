import React from "react";
import axios from "axios";
import styled from "styled-components";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

const Table = styled.table`
  width: 100%;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  max-width: 1120px;
  margin: 20px auto;
  word-break: break-all;
`;

export const Thead = styled.thead``;

export const Tbody = styled.tbody``;

export const Tr = styled.tr``;

export const Th = styled.th`
  text-align: start;
  border-bottom: inset;
  padding-bottom: 5px;

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;

export const Td = styled.td`
  padding-top: 15px;
  text-align: ${(props) => (props.alignCenter ? "center" : "start")};
  width: ${(props) => (props.width ? props.width : "auto")};

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;

const Grid = ({ products, setProducts, setOnEdit }) => {
  const handleEdit = (item) => {
    setOnEdit(item);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/${id}`);
      const newArray = products.filter((product) => product._id !== id);
      setProducts(newArray);
      toast.success("Produto deletado com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar produto:", error);
      toast.error("Erro ao deletar produto");
    }

    setOnEdit(null);
  };

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Nome</Th>
          <Th>Código</Th>
          <Th onlyWeb>Descrição</Th>
          <Th onlyWeb>Preço</Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {products.map((item) => (
          <Tr key={item._id}>
            <Td width="30%">{item.name}</Td>
            <Td width="30%">{item.codigo}</Td>
            <Td width="20%" onlyWeb>
              {item.descricao}
            </Td>
            <Td width="20%" onlyWeb>
              {item.preco}
            </Td>
            <Td alignCenter width="5%">
              <FaEdit className="icon-blue" onClick={() => handleEdit(item)} />
            </Td>
            <Td alignCenter width="5%">
              <FaTrash className="icon-red" onClick={() => handleDelete(item._id)} />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default Grid;
