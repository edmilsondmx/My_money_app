import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, arrayInsert, arrayRemove } from 'redux-form';
import Grid from '../common/layout/Grid';
import IconButton from '../common/template/IconButton';
import Input from '../common/form/Input';
import If from '../common/operador/If';

class ItemList extends Component {
  constructor(props) {
    super(props);
    this.renderRows = this.renderRows.bind(this);
    // this.add = this.add.bind(this);
    // this.remove = this.remove.bind(this);
  }

  add(index, item = {}) {
    this.props.arrayInsert('billingCycleForm', this.props.field, index, item);
  }

  remove(index) {
    this.props.arrayRemove('billingCycleForm', this.props.field, index);
  }

  renderRows() {
    const list = this.props.list || [];

    if (list.length === 0) {
      list.push({ name: '', value: '' });
    }

    return list.map((_item, index) => (
      <tr key={index}>
        <td>
          <Field
            name={`${this.props.field}[${index}].name`}
            component={Input}
            placeholder="Insira o nome"
            type="text"
            readOnly={this.props.readOnly}
          />
        </td>
        <td>
          <Field
            name={`${this.props.field}[${index}].value`}
            component={Input}
            placeholder="Insira o valor"
            type="number"
            readOnly={this.props.readOnly}
          />
        </td>
        <If test={this.props.showStatus}>
          <td>
            <Field
              name={`${this.props.field}[${index}].status`}
              className="form-select py-3"
              component="select"
              disabled={this.props.readOnly}
            >
              <option value="">Selecione uma opção</option>
              <option value="PENDENTE">PENDENTE</option>
              <option value="AGENDADO">AGENDADO</option>
              <option value="PAGO">PAGO</option>
            </Field>
          </td>
        </If>
        <If test={!this.props.readOnly}>
          <td>
            <IconButton
              color="success"
              icon="plus"
              onClick={() => {
                this.add(index + 1);
              }}
            />
            <IconButton
              color="warning"
              icon="copy"
              onClick={() => {
                this.add(index + 1, _item);
              }}
            />
            <IconButton
              color="danger"
              icon="trash-o"
              onClick={() => {
                this.remove(index);
              }}
            />
          </td>
        </If>
      </tr>
    ));
  }
  render() {
    return (
      <Grid cols={this.props.cols}>
        <fieldset>
          <legend>{this.props.legend}</legend>
          <table className="table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Valor</th>
                <If test={this.props.showStatus}>
                  <th>Status</th>
                </If>
                <If test={!this.props.readOnly}>
                  <th className="table-actions">Ações</th>
                </If>
              </tr>
            </thead>
            <tbody>{this.renderRows()}</tbody>
          </table>
        </fieldset>
      </Grid>
    );
  }
}
const mapDispatchToProps = (dispatch) => bindActionCreators({ arrayInsert, arrayRemove }, dispatch);

export default connect(null, mapDispatchToProps)(ItemList);
