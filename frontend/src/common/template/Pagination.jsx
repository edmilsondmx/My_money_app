import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setCurrentPage, getListPag, getCount } from '../../store/actions/billingCycleActions';

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  componentDidMount() {
    this.props.getListPag(this.props.currentPage, this.props.itemsPerPage);
    this.props.getCount();
  }

  handlePageChange(event) {
    const newPage = Number(event.target.value);
    const startIndex = (newPage - 1) * this.props.itemsPerPage;
    const endIndex = this.props.itemsPerPage;
    this.props.setCurrentPage(newPage);
    this.props.getListPag(startIndex, endIndex);
  }

  render() {
    const { currentPage, itemsPerPage, count } = this.props;

    const testPage = Math.ceil(count / itemsPerPage);
    return (
      <div className="d-flex justify-content-center align-items-center select mb-4">
        {testPage === 1 ? (
          <span className="d-flex justify-content-center align-items-center text-secondary">
            <i className="fa fa-file me-2"></i>
            Página única
            <i className="fa fa-chevron-down ms-3"></i>
          </span>
        ) : (
          <div>
            <i className="far fa-file me-2"></i>
            <select value={currentPage} onChange={this.handlePageChange}>
              {Array.from({ length: Math.ceil(count / itemsPerPage) }, (_, i) => i + 1).map((page) => (
                <option className="item" key={page} value={page}>
                  Página {page}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentPage: state.billingCycle.currentPage,
  itemsPerPage: state.billingCycle.itemsPerPage,
  count: state.billingCycle.count,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ setCurrentPage, getListPag, getCount }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
