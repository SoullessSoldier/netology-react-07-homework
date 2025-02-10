import React, { useState } from "react";
import calcDateDifference from "./utils/dateUtils";

function DateTime(props) {
  return <p className="date">{props.date}</p>;
}

const DateTimePretty = (Component) => {
  const WrappedComponent = (props) => {
    const date = calcDateDifference(props.date);
    return <Component {...props} date={date} />
  }
  const componentName = Component.displayName || Component.name || "Component";
  WrappedComponent.displayName = `DateTimePretty(${componentName})`;
  return WrappedComponent;
}

const DateTimePrettyComponent = DateTimePretty(DateTime); 

function Video(props) {
  return (
    <div className="video">
      <iframe
        src={props.url}
        style={{"border":"none"}}
        allow="autoplay; encrypted-media"
        allowfullscreen
      ></iframe>
      <DateTimePrettyComponent date={props.date} />
    </div>
  );
}

function VideoList(props) {
  return props.list.map((item, key) => <Video url={item.url} date={item.date} key={key} />);
}

export default function App() {
  const [list, setList] = useState([
    {
      url: "https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0",
      date: "2024-07-31 13:24:00",
    },
    {
      url: "https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0",
      date: "2024-12-31 12:10:00",
    },
    {
      url: "https://www.youtube.com/embed/xGRjCa49C6U?rel=0&amp;controls=0&amp;showinfo=0",
      date: "2025-02-03 23:16:00",
    },
    {
      url: "https://www.youtube.com/embed/RK1K2bCg4J8?rel=0&amp;controls=0&amp;showinfo=0",
      date: "2025-02-10 12:10:00",
    },
    {
      url: "https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0",
      date: "2025-02-10 21:17:00",
    },
    {
      url: "https://www.youtube.com/embed/TxbE79-1OSI?rel=0&amp;controls=0&amp;showinfo=0",
      date: "2025-02-10 22:03:00",
    },
  ]);

  return <VideoList list={list} />;
}
