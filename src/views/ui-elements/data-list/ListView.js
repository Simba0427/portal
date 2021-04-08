import React from "react"
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Row,
  Col,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Collapse,
  Spinner,
  Button,
} from "reactstrap"
import { ContextLayout } from "../../../utility/context/Layout"
import { AgGridReact } from "ag-grid-react"
import {
  Edit,
  Trash2,
  ChevronDown,
  RotateCw,
  X
} from "react-feather"
import classnames from "classnames"
import { history } from "../../../history"
import "../../../assets/scss/plugins/tables/_agGridStyleOverride.scss"
import "../../../assets/scss/pages/users.scss"

import UserService from "../../../services/UserService";
import ReportService from "../../../services/ReportService";

import MembershipFilter from "../filters/MembershipFilter";
import RevenueFilter from "../filters/RevenueFilter"
import BillingFilter from "../filters/BillingFilter";
import UserModal from "../modals/UserModal";
import ReportModal from "../modals/ReportModal";

const { user_role } = localStorage.getItem("userData") !== "" ? JSON.parse(localStorage.getItem("userData")) : null;

class ListView extends React.Component {
  state = {
    rowData: null,
    columnDefs: [
      {
        headerName: "Actions",
        field: "transactions",
        width: 150,
        cellRendererFramework: params => {
          return (
            <div className="actions cursor-pointer">
              <Edit
                  className="mr-50"
                  size={15}
                  onClick={(e) => {
                      let selectedData = this.gridApi.getSelectedRows();
                      this.handleUpdateRow(selectedData[0]);
                  }}
              />
              <Trash2
                size={15}
                onClick={() => {
                  let selectedData = this.gridApi.getSelectedRows();
                  this.gridApi.updateRowData({ remove: selectedData });
                  this.handleDeleteRow(selectedData);
                }}
              />
            </div>
          )
        }
      }
    ],
    pageSize: 20,
    isVisible: true,
    reload: false,
    collapse: true,
    status: "Opened",
    role: "All",
    selectStatus: "All",
    verified: "All",
    department: "All",
    defaultColDef: {
      sortable: true
    },
    searchVal: "",
    selectedRowIds: [],
    selectedRow: null,
    openMemberModal: false,
    openReportModal: false,
    openModalType: "",
  }

  componentWillMount() {
    let { menu, rowData } = this.props;
    
    // add "Action Column" in table columnDefs
    if (this.props.columnDefs !== null) {
      const { columnDefs } = this.state;

      if (menu === "Member" || menu === "User" || (menu === "Report" && user_role === "admin")) {
        const updatedColumnDefs = this.props.columnDefs;
        const updateColumnDefs = [...updatedColumnDefs, columnDefs[0]];

        this.setState({
          columnDefs: updateColumnDefs,
        })
      } else {
        this.setState({
          columnDefs: this.props.columnDefs,
        })
      }
    }

    if (rowData !== null) {
      this.setState({
        rowData: rowData,
      })
    }
  }

  componentDidUpdate(prevProps) {
    let { menu, rowData, columnDefs } = this.props;

    if (rowData !== prevProps.rowData) {
      this.setState({
        rowData: rowData,
      })
    }
    
    // add "Action Column" in table columnDefs
    if (columnDefs !== prevProps.columnDefs) {

      if (menu === "Revenue") {
        this.setState({
          columnDefs: columnDefs,
        });
      }
    }
  }

  // -------   ------- //

  // Event when clicking update button in table row
  handleUpdateRow = ( selectedRow ) => {
    let { menu } = this.props;
    // console.log(selectedRow)
    
    if (menu === "Member") {
      this.setState({
        selectedRow: selectedRow,
        openMemberModal: true,
        openModalType: "update",
      })
    } else if (menu === "User") {
      history.push("/users/edit", selectedRow);
    } else if (menu === "Report") {
      this.setState({
        selectedRow: selectedRow,
        openReportModal: true,
        openModalType: "update",
      })
    }
  }

  // Event when clicking delete button in table row
  handleDeleteRow = ( selectedRows ) => {
    let { menu } = this.props;

    if (menu === "Member" || menu === "User") {
      UserService.delete({ user_id: selectedRows[0].user_id }).then(response => {
        console.log(response.data)
      })
    } else if (menu === "Report") {
      ReportService.delete({ report_id: selectedRows[0].report_id }).then(response => {
        console.log(response.data)
      })
    }
  }

  // Event to show "Add Member" modal when clicking "Add Member" button 
  handleOpenAddModal = () => {
    if (this.props.menu === "Member") {
      this.setState({
        openMemberModal: true,
        openModalType: "create",
      })
    }

    if(this.props.menu === "Report") {
      this.setState({
        openReportModal: true,
        openModalType: "create",
      })
    }
  }

  handleCloseModal = () => {
    this.setState({
      openMemberModal: false, 
      openReportModal: false,
    })
  }

  onGridReady = params => {
    this.gridApi = params.api
    this.gridColumnApi = params.columnApi
  }

  filterData = (column, val) => {
    var filter = this.gridApi.getFilterInstance(column)
    var modelObj = null
    if (val !== "all") {
      modelObj = {
        type: "equals",
        filter: val
      }
    }
    filter.setModel(modelObj)
    this.gridApi.onFilterChanged()
  }

  filterSize = val => {
    if (this.gridApi) {
      this.gridApi.paginationSetPageSize(Number(val))
      this.setState({
        pageSize: val
      })
    }
  }
  updateSearchQuery = val => {
    this.gridApi.setQuickFilter(val)
    this.setState({
      searchVal: val
    })
  }

  refreshCard = () => {
    this.setState({ reload: true })
    setTimeout(() => {
      this.setState({
        reload: false,
        role: "All",
        selectStatus: "All",
        verified: "All",
        department: "All"
      })
    }, 500)
  }

  toggleCollapse = () => {
    this.setState(state => ({ collapse: !state.collapse }))
  }
  onEntered = () => {
    this.setState({ status: "Opened" })
  }
  onEntering = () => {
    this.setState({ status: "Opening..." })
  }

  onEntered = () => {
    this.setState({ status: "Opened" })
  }
  onExiting = () => {
    this.setState({ status: "Closing..." })
  }
  onExited = () => {
    this.setState({ status: "Closed" })
  }
  removeCard = () => {
    this.setState({ isVisible: false })
  }

  render() {
    const { rowData, columnDefs, defaultColDef, pageSize, openMemberModal, openReportModal, openModalType, selectedRow } = this.state
    const { menu, isAddButton, isFilter } = this.props

    return (
      <Row className="app-user-list">
      {isFilter ?
        <Col sm="12">
            <Card
              className={classnames("card-action card-reload", {
                "d-none": this.state.isVisible === false,
                "card-collapsed": this.state.status === "Closed",
                closing: this.state.status === "Closing...",
                opening: this.state.status === "Opening...",
                refreshing: this.state.reload
              })}
            >
              <CardHeader>
                <CardTitle>Filters</CardTitle>
                <div className="actions">
                  <ChevronDown
                    className="collapse-icon mr-50"
                    size={15}
                    onClick={this.toggleCollapse}
                  />
                  <RotateCw
                    className="mr-50"
                    size={15}
                    onClick={() => {
                      this.refreshCard()
                      this.gridApi.setFilterModel(null)
                    }}
                  />
                  <X size={15} onClick={this.removeCard} />
                </div>
              </CardHeader>
              <Collapse
                isOpen={this.state.collapse}
                onExited={this.onExited}
                onEntered={this.onEntered}
                onExiting={this.onExiting}
                onEntering={this.onEntering}
              >
                <CardBody>
                  {this.state.reload ? (
                    <Spinner color="primary" className="reload-spinner" />
                  ) : (
                    ""
                  )}
                  { this.props.menu === "Memberships" ? <MembershipFilter /> : null }
                  { this.props.menu === "Revenue" ? <RevenueFilter /> : null }
                  { this.props.menu === "Billing" ? <BillingFilter /> : null }

                </CardBody>
              </Collapse>
            </Card>
          </Col> : null
      }
        <Col sm="12">
          <Card>
            <CardBody>
              <div className="ag-theme-material ag-grid-table" style={{height: 'calc(100vh - 300px)'}}>
                <div className="ag-grid-actions d-flex justify-content-between flex-wrap mb-1">
                  <div className="sort-dropdown">
                    <UncontrolledDropdown className="ag-dropdown p-1">
                      <DropdownToggle tag="div">
                        1 - {pageSize} of 150
                        <ChevronDown className="ml-50" size={15} />
                      </DropdownToggle>
                      <DropdownMenu right>
                        <DropdownItem
                          tag="div"
                          onClick={() => this.filterSize(20)}
                        >
                          20
                        </DropdownItem>
                        <DropdownItem
                          tag="div"
                          onClick={() => this.filterSize(50)}
                        >
                          50
                        </DropdownItem>
                        <DropdownItem
                          tag="div"
                          onClick={() => this.filterSize(100)}
                        >
                          100
                        </DropdownItem>
                        <DropdownItem
                          tag="div"
                          onClick={() => this.filterSize(150)}
                        >
                          150
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </div>
                  <div className="filter-actions d-flex">
                    <div className="dropdown actions-dropdown">
                      { (isAddButton && (user_role === "admin")) ? <Button.Ripple color="primary" onClick={this.handleOpenAddModal}>Add {menu}</Button.Ripple> : null }
                    </div>
                    <UserModal openModal={openMemberModal} onCloseModal={this.handleCloseModal} openModalType={openModalType} selectedRow={selectedRow}/>
                    <ReportModal openModal={openReportModal} onCloseModal={this.handleCloseModal} openModalType={openModalType} selectedRow={selectedRow}/>
                  </div>
                </div>
                {this.state.rowData !== null ? (
                  <ContextLayout.Consumer>
                    {context => (
                    
                      <AgGridReact
                        gridOptions={{}}
                        rowSelection="multiple"
                        defaultColDef={defaultColDef}
                        columnDefs={columnDefs}
                        rowData={rowData}
                        onGridReady={this.onGridReady}
                        colResizeDefault={"shift"}
                        animateRows={true}
                        floatingFilter={true}
                        pagination={true}
                        pivotPanelShow="always"
                        paginationPageSize={pageSize}
                        resizable={true}
                        enableRtl={context.state.direction === "rtl"}
                      />
                    
                    )}
                  </ContextLayout.Consumer>
                ) : null}
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    )
  }
}

export default ListView
