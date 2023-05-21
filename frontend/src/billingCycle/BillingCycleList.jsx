import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { showUpdate, showRemove } from '../store/actions/billingCycleActions';

import IconButton from '../common/template/IconButton';
import Pagination from '../common/template/Pagination';

class BillingCycleList extends Component {
  constructor(props) {
    super(props);
    this.renderRows = this.renderRows.bind(this);
  }

  renderRows() {
    const list = this.props.list || [];
    return list.map((cycle) => (
      <tr key={cycle._id}>
        <td>{cycle.name}</td>
        <td>{cycle.month}</td>
        <td>{cycle.year}</td>
        <td>
          <IconButton
            color="warning"
            icon="pencil"
            onClick={() => {
              this.props.showUpdate(cycle);
            }}
          />
          <IconButton
            color="danger"
            icon="trash-o"
            onClick={() => {
              this.props.showRemove(cycle);
            }}
          />
        </td>
      </tr>
    ));
  }

  render() {
    const list = this.props.list || [];
    return (
      <div>
        {list.length === 0 ? (
          <div
            className="border text-info-emphasis border-primary-subtle bg-primary-subtle rounded py-2 px-2 mb-4"
            role="alert"
          >
            <h3 className="text-center">
              <i className="fas fa-quote-right fa-rotate-180"></i> Sem mais itens na lista{' '}
              <i className="fas fa-quote-right"></i>
            </h3>
          </div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Mês</th>
                <th>Ano</th>
                <th className="table-actions">Ações</th>
              </tr>
            </thead>
            <tbody>{this.renderRows()}</tbody>
          </table>
        )}
        <Pagination />
      </div>
    );
  }
}
const mapStateToProps = (state) => ({ list: state.billingCycle.list });

const mapDispatchToProps = (dispatch) => bindActionCreators({ showUpdate, showRemove }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BillingCycleList);
