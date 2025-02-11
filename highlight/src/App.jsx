import React, { useState } from "react";

function New(props) {
  return (
    <div className="wrap-item wrap-item-new">
      <span className="label">New!</span>
      {props.children}
    </div>
  );
}

function Popular(props) {
  return (
    <div className="wrap-item wrap-item-popular">
      <span className="label">Popular!</span>
      {props.children}
    </div>
  );
}

function Article(props) {
  return (
    <div className="item item-article">
      <h3>
        <a href="#">{props.title}</a>
      </h3>
      <p className="views">Прочтений: {props.views}</p>
    </div>
  );
}

function Video(props) {
  return (
    <div className="item item-video">
      <iframe
        src={props.url}
        style={{"border": "none"}}
        allow="autoplay; encrypted-media"
        allowfullscreen
      ></iframe>
      <p className="views">Просмотров: {props.views}</p>
    </div>
  );
}

const CategorizedByViews = (Component) => {
  const WrappedComponent = (props) => {
    if (props.views < 100) {
      return <New><Component {...props} /></New>;
    }
    if (props.views >= 1000) {
      return <Popular><Component {...props} /></Popular>;
    }    
    return <Component {...props} />
  };
  const componentName = Component.displayName || Component.name || "Component";
  WrappedComponent.displayName = `CategorizedByViews(${componentName})`;
  return WrappedComponent;
};

const VideoCategorizedByViews = CategorizedByViews(Video);
const ArticleCategorizedByViews = CategorizedByViews(Article);

function List(props) {
  return props.list.map((item, key) => {
    switch (item.type) {
      case "video":
        return <VideoCategorizedByViews {...item} key={key}/>;

      case "article":
        return <ArticleCategorizedByViews {...item} key={key}/>;
    }
  });
}

export default function App() {
  const [list, setList] = useState([
    {
      type: "video",
      url: "https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0",
      views: 50,
    },
    {
      type: "video",
      url: "https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0",
      views: 12,
    },
    {
      type: "article",
      title: "Невероятные события в неизвестном поселке...",
      views: 175,
    },
    {
      type: "article",
      title: "Секретные данные были раскрыты!",
      views: 1532,
    },
    {
      type: "video",
      url: "https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0",
      views: 4253,
    },
    {
      type: "article",
      title: "Кот Бегемот обладает невероятной...",
      views: 12,
    },
  ]);

  return <List list={list} />;
}
