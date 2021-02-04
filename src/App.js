import React from "react";
import ReactDOM from "react-dom";
import DataTable from "react-data-table-component";
import Card from "@material-ui/core/Card";
import SortIcon from "@material-ui/icons/ArrowDownward";
import Detail from "./details/detail";
import "./App.css";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          name: "Title Name",
          selector: "titleName",
          sortable: true,
          width: "250px",
        },
        {
          name: "Type",
          selector: "type",
          sortable: true,
          width: "250px",
        },
        {
          name: "Description",
          selector: "description",
          sortable: true,
          maxWidth: "800px",
        },
      ],
      data: [],
      dataLoading: false,
      details: {},
      searchText: "",
    };
    this.callSearch = this.callSearch.bind(this);
    this.onInputchange = this.onInputchange.bind(this);
  }

  componentDidMount() {
    this.setState({
      dataLoading: true,
    })
    fetch("https://localhost:44323/api/marketplace/GetTitle", {
      method: "GET",
      // if any headers added in future it will be used
      // "headers": {
      //   "x-rapidapi-host": "fairestdb.p.rapidapi.com",
      //   "x-rapidapi-key": "apikey"
      // }
    })
      .then((response) => response.json())
      .then((response) => {
        this.setState({
          data: response,
          dataLoading: false
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  callSearch(value) {
    if(this.state.searchText == '') {
      this.componentDidMount();
    }
    const regexp = new RegExp(this.state.searchText, 'i');
    let data = this.state.data.filter(x => this.state.searchText==''?true:regexp.test(x.title))
    this.setState({
      data:data
    })
  }
  onInputchange(event) {
    this.setState({
      searchText: event.target.value,
    });
  }

  render() {
    const ExpandableComponent = ({ data }) => (
      <Detail userId={data.userId} />
    );

    return (
      <div className="App">
        <Card>
          <div className="search-part">
            <input
              type="text"
              placeholder="Search by Title Name"
              className="search"
              onChange={this.onInputchange}
            />
            <button
              value={this.state.searchText}
              name="search"
              className="search-button"
              onClick={this.callSearch}
            >
              Search
            </button>
          </div>
          <DataTable
            noHeader= 'false'
            columns={this.state.columns}
            data={this.state.data}
            defaultSortField="title"
            sortIcon={<SortIcon />}
            data-tag="allowRowEvents"
            pagination
            expandableRows
            expandOnRowClicked
            expandableRowsComponent={<ExpandableComponent />}
            progressPending={this.state.dataLoading}
          />
        </Card>
      </div>
    );
  }
}

export default App;
