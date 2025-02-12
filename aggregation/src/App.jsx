import { useState, useEffect } from "react";
import { backendUrl } from "@/config/backend_url";

const sortByDate = (item1, item2) => {
  const d1 = new Date(item1.date);
  const d2 = new Date(item2.date);
  return d1 - d2 ;
};

const sortData = (data = []) => {
  const myData = [...data]; 
  return myData.sort(sortByDate);
};

const aggregateByYearMonth = (data, mode="byMonth") => {
  let distance = 0;
  switch(mode) {
    case "byMonth":
      distance = 7;
      break;
    case "byYear":
      distance = 4;
      break;
    default:
      distance = 10;
  }
  const resArray = [];
  const tempObject = data.reduce((acc, item) => {
    const yearMonth = item.date.slice(0, distance);
    if (!acc[yearMonth]) {
      acc[yearMonth] = 0;
    }
    acc[yearMonth] += item.amount;
    return acc;
  }, {});
  Object.keys(tempObject).forEach((keyItem) => resArray.push({date: keyItem, amount: tempObject[keyItem]}))
  return resArray;
};

const useData = (options) => {
  const { mapData, url, defaultData } = options;
  const [data, setData] = useState(defaultData);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setData(mapData(data.list)));
  }, [url]);

  return data;
};

function YearTable(props) {
  const {list} = props;
  return (
    <div>
      <h2>Year Table</h2>
      <table>
        <thead>
        <tr>
          <th>Year</th>
          <th>Amount</th>
        </tr>
        </thead>
        <tbody>
        {list.map((item, key) => (
          <tr key={key}>
            <td>{item.date}</td>
            <td>{item.amount}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}

function SortTable(props) {
  const {list} = props;
  return (
    <div>
      <h2>Sort Table</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item, key) => (
            <tr key={key}>
              <td>{item.date}</td>
              <td>{item.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function MonthTable(props) {
  const { list } = props;
  return (
    <div>
      <h2>Month Table</h2>
      <table>
        <thead>
          <tr>
            <th>Month</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item, key) => (
            <tr key={key}>
              <td>{item.date}</td>
              <td>{item.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const YearTableView = (props) => {
  const { list } = props;
  const data = aggregateByYearMonth(list, "byYear");
  return <YearTable list={data} />;
};

const MonthTableView = (props) => {
  const {list} = props;
  const data = aggregateByYearMonth(list, "byMonth");
  return <MonthTable list={data} />
}

const SortTableView = (props) => {
  const { list } = props;
  const data = aggregateByYearMonth(list, "byDate");
  return <SortTable list={data} />;
};

const AppView = ({list}) => {
  return (
      <div id="app">
        <MonthTableView list={list} />
        <YearTableView list={list} />
        <SortTableView list={list} />
      </div>
    );
}

const AppLoader = () => {
  const data = useData({mapData: sortData, url: backendUrl, defaultData: []});
  return <AppView list={data}/>
}

const App = () => {
  return <AppLoader />
}

export default App;
