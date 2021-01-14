import React, { Component, useState } from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./index.css";
import { Typography, List, message, Avatar, Spin, Input, Button } from "antd";

import {
  HighlightOutlined,
  SmileOutlined,
  SmileFilled
} from "@ant-design/icons";

const { Paragraph } = Typography;

const demo = [
  {
    ID: "1",
    TITLE: "6666",
    TYPE_ID: "SALE",
    STAGE_ID: "NEW",
    PROBABILITY: null,
    CURRENCY_ID: "RUB",
    OPPORTUNITY: "0.00",
    IS_MANUAL_OPPORTUNITY: "N",
    TAX_VALUE: "0.00",
    LEAD_ID: null,
    COMPANY_ID: "0",
    CONTACT_ID: null,
    QUOTE_ID: null,
    BEGINDATE: "2021-01-13T03:00:00+03:00",
    CLOSEDATE: "2021-01-20T03:00:00+03:00",
    ASSIGNED_BY_ID: "1",
    CREATED_BY_ID: "1",
    MODIFY_BY_ID: "1",
    DATE_CREATE: "2021-01-13T10:21:44+03:00",
    DATE_MODIFY: "2021-01-14T02:58:04+03:00",
    OPENED: "Y",
    CLOSED: "N",
    COMMENTS: "",
    ADDITIONAL_INFO: null,
    LOCATION_ID: null,
    CATEGORY_ID: "0",
    STAGE_SEMANTIC_ID: "P",
    IS_NEW: "Y",
    IS_RECURRING: "N",
    IS_RETURN_CUSTOMER: "N",
    IS_REPEATED_APPROACH: "N",
    SOURCE_ID: "",
    SOURCE_DESCRIPTION: "",
    ORIGINATOR_ID: null,
    ORIGIN_ID: null,
    UTM_SOURCE: null,
    UTM_MEDIUM: null,
    UTM_CAMPAIGN: null,
    UTM_CONTENT: null,
    UTM_TERM: null
  }
];

import reqwest from "reqwest";

import WindowScroller from "react-virtualized/dist/commonjs/WindowScroller";
import AutoSizer from "react-virtualized/dist/commonjs/AutoSizer";
import VList from "react-virtualized/dist/commonjs/List";
import InfiniteLoader from "react-virtualized/dist/commonjs/InfiniteLoader";

// const fakeDataUrl =
//   "https://randomuser.me/api/?results=50&inc=name,gender,email,nat&noinfo";

// const fakeDataUrl = require("./data.json");
let DataUrl =
  "https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo";

// const ED = () => {
//   const [(editableStr, setEditableStr)] = useState("This is an editable text.");
//   return (
//   );
// };
const edd = a => (
  <Paragraph
    editable={{
      tooltip: false,
      text: "111",
      onChange: title => {
        console.log(title);
      }
    }}
  >
    {" "}
    {a}
  </Paragraph>
);
class VirtualizedExample extends React.Component {
  state = {
    data: [],
    loading: false
  };

  loadedRowsMap = {};

  componentDidMount() {
    this.fetchData(res => {
      this.setState({
        data: res.results
      });
    });
  }

  fetchData = callback => {
    reqwest({
      url: DataUrl,
      type: "json",
      method: "get",
      contentType: "application/json",
      success: res => {
        callback(res);
      }
    });
  };

  handleInfiniteOnLoad = ({ startIndex, stopIndex }) => {
    let { data } = this.state;
    this.setState({
      loading: true
    });
    for (let i = startIndex; i <= stopIndex; i++) {
      // 1 means loading
      this.loadedRowsMap[i] = 1;
    }
    if (data.length > 19) {
      message.warning("Virtualized List loaded all");
      this.setState({
        loading: false
      });
      return;
    }
    this.fetchData(res => {
      data = data.concat(res.results);
      this.setState({
        data,
        loading: false
      });
    });
  };

  isRowLoaded = ({ index }) => !!this.loadedRowsMap[index];

  renderItem = ({ index, key, style }) => {
    const { data } = this.state;
    const item = data[index];

    return (
      <List.Item key={key} style={style}>
        <List.Item.Meta
          avatar={
            <Avatar src="https://samodelkin-mag.ru/assets/main/images/approve.png" />
          }
          title={<a href="#">{item.name.last}</a>}
          description={item.email}
        />

        <Button type="primary">Primary Button</Button>
        <div />
      </List.Item>
    );
  };

  render() {
    const { data } = this.state;
    const vlist = ({
      height,
      isScrolling,
      onChildScroll,
      scrollTop,
      onRowsRendered,
      width
    }) => (
      <VList
        autoHeight
        height={height}
        isScrolling={isScrolling}
        onScroll={onChildScroll}
        overscanRowCount={2}
        rowCount={data.length}
        rowHeight={73}
        rowRenderer={this.renderItem}
        onRowsRendered={onRowsRendered}
        scrollTop={scrollTop}
        width={width}
      />
    );
    const autoSize = ({
      height,
      isScrolling,
      onChildScroll,
      scrollTop,
      onRowsRendered
    }) => (
      <AutoSizer disableHeight>
        {({ width }) =>
          vlist({
            height,
            isScrolling,
            onChildScroll,
            scrollTop,
            onRowsRendered,
            width
          })
        }
      </AutoSizer>
    );
    const infiniteLoader = ({
      height,
      isScrolling,
      onChildScroll,
      scrollTop
    }) => (
      <InfiniteLoader
        isRowLoaded={this.isRowLoaded}
        loadMoreRows={this.handleInfiniteOnLoad}
        rowCount={data.length}
      >
        {({ onRowsRendered }) =>
          autoSize({
            height,
            isScrolling,
            onChildScroll,
            scrollTop,
            onRowsRendered
          })
        }
      </InfiniteLoader>
    );
    return (
      <List>
        {data.length > 0 && <WindowScroller>{infiniteLoader}</WindowScroller>}
        {this.state.loading && <Spin className="demo-loading" />}
      </List>
    );
  }
}

class List2s extends Component {
  state = {
    data: [],
    loading: false
  };

  loadedRowsMap = {};

  componentDidMount() {
    this.fetchData(res => {
      this.setState({
        data: res.results
      });
    });
  }

  fetchData = callback => {
    console.log("1");
    var myHeaders = new Headers();
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      body: {},
      redirect: "follow"
    };

    fetch("https://api.samodelkin.email/yookassa/list", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log("error", error));
    // let DataUrl = "https://api.samodelkin.email/bx/app";

    // reqwest({
    //   url: "https://api.samodelkin.email/bx/app",
    //   type: "json",
    //   method: "put",
    //   contentType: "application/json",
    //   params: {},
    //   success: res => {
    //     console.log(res);
    //     callback(res);
    //   }
    // });
  };
  renderItem = ({ index, key, style }) => {
    const { data } = this.state;
    const item = data[index];

    return (
      <List.Item key={key} style={style}>
        <List.Item.Meta
          avatar={
            <Avatar src="https://samodelkin-mag.ru/assets/main/images/approve.png" />
          }
          title={<a href="#">{item.name.last}</a>}
          description={item.email}
        />

        <Button type="primary">Primary Button</Button>
        <div />
      </List.Item>
    );
  };
  render() {
    const { data } = this.state;

    return <List>{data}</List>;
  }
}

// var data;
// var xhr = new XMLHttpRequest();
// xhr.withCredentials = true;

// xhr.addEventListener("readystatechange", function() {
//   if (this.readyState === 4) {
//     console.log(this.responseText);
//   }
// });

// xhr.open("GET", "https://api.samodelkin.email/yookassa/list");
// xhr.setRequestHeader("Content-Type", "application/json");

// xhr.send(data);

ReactDOM.render(<List2s />, document.getElementById("container"));
