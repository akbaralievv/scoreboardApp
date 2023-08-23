import React, { useEffect, useState } from 'react';
import 'react-data-grid/lib/styles.css';
import DataGrid from 'react-data-grid';
import styles from './Table.module.css';
import { transformArr } from '../../helpers/transformArr';

const Table = ({ data, resultScore }) => {
  const [clubeNameColumns, setClubeNameColumns] = useState([]);
  const [clubeNameRow, setClubeNameRow] = useState([]);
  const [arrAllNameClube, setArrAllNameClube] = useState([]);
  const [dataForRow, setDataForRow] = useState([]);

  useEffect(() => {
    const initialObj = { key: 'allRow', name: 'Участники' };
    if (data) {
      const newArr = data.map((item) => ({
        key: item.team_name,
        name: item.team_name,
      }));
      newArr.unshift(initialObj);
      setClubeNameColumns(newArr);
      // console.log(clubeNameColumns);
    }
  }, [data]);
  // { editable: true }

  useEffect(() => {
    if (resultScore) {
      const newArr = [];
      const arrScore = [];
      const dataScoreWithOutClear = [];
      resultScore?.forEach((item) => {
        newArr.push({ allRow: item[0] });
        arrScore.push([item[0]]);
        dataScoreWithOutClear.push(item[1]);
      });
      setDataForRow(dataScoreWithOutClear);
      setClubeNameRow(newArr);
      setArrAllNameClube(arrScore);
    }
  }, [resultScore]);

  return (
    <div className={styles.table}>
      <DataGrid
        columns={clubeNameColumns}
        rows={transformArr(arrAllNameClube, dataForRow, clubeNameRow)}
        frozenColumns={1}
      />
    </div>
  );
};
export default Table;
